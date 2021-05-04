/**
* DevExtreme (viz/polar_chart.d.ts)
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
    event
} from '../events/index';

import {
    format
} from '../ui/widget/ui.widget';

import { HatchingDirectionType } from './common';

import {
    baseSeriesObject,
    chartAxisObject
} from './chart';

import {
    BaseChart,
    BaseChartAdaptiveLayout,
    BaseChartLegend,
    BaseChartOptions,
    BaseChartTooltip,
    BaseChartAnnotationConfig
} from './chart_components/base_chart';

import {
    template
} from '../core/templates/template';

import {
    VizRange,
    DashStyleType,
    TimeIntervalType
} from './common';

import {
    Font
} from './core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type PolarChartSeriesType = 'area' | 'bar' | 'line' | 'scatter' | 'stackedbar';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface PolarChartSeries extends dxPolarChartSeriesTypesCommonPolarChartSeries {
    /**
     * Specifies the name that identifies the series.
     */
    name?: string;
    /**
     * Specifies data about a series.
     */
    tag?: any;
    /**
     * Sets the series type.
     */
    type?: PolarChartSeriesType;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartOptions extends BaseChartOptions<dxPolarChart> {
    /**
     * Specifies adaptive layout properties.
     */
    adaptiveLayout?: dxPolarChartAdaptiveLayout;
    /**
     * Specifies the annotation collection.
     */
    annotations?: Array<dxPolarChartAnnotationConfig | any>;
    /**
     * Specifies argument axis properties for the PolarChart UI component.
     */
    argumentAxis?: dxPolarChartArgumentAxis;
    /**
     * Controls the padding and consequently the angular width of a group of bars with the same argument using relative units. Ignored if the barGroupWidth property is set.
     */
    barGroupPadding?: number;
    /**
     * Specifies a fixed angular width for groups of bars with the same argument, measured in degrees. Takes precedence over the barGroupPadding property.
     */
    barGroupWidth?: number;
    /**
     * Specifies settings common for all annotations in the PolarChart.
     */
    commonAnnotationSettings?: dxPolarChartCommonAnnotationConfig;
    /**
     * An object defining the configuration properties that are common for all axes of the PolarChart UI component.
     */
    commonAxisSettings?: dxPolarChartCommonAxisSettings;
    /**
     * An object defining the configuration properties that are common for all series of the PolarChart UI component.
     */
    commonSeriesSettings?: dxPolarChartCommonSeriesSettings;
    /**
     * Specifies the color of the parent page element.
     */
    containerBackgroundColor?: string;
    /**
     * Customizes an individual annotation.
     */
    customizeAnnotation?: ((annotation: dxPolarChartAnnotationConfig | any) => dxPolarChartAnnotationConfig);
    /**
     * An object providing properties for managing data from a data source.
     */
    dataPrepareSettings?: { checkTypeForAllData?: boolean, convertToAxisDataType?: boolean, sortingMethod?: boolean | ((a: { arg?: Date | number | string, val?: Date | number | string }, b: { arg?: Date | number | string, val?: Date | number | string }) => number) };
    /**
     * Specifies the properties of a chart's legend.
     */
    legend?: dxPolarChartLegend;
    /**
     * Forces the UI component to treat negative values as zeroes. Applies to stacked-like series only.
     */
    negativesAsZeroes?: boolean;
    /**
     * A function that is executed when a label on the argument axis is clicked or tapped.
     */
    onArgumentAxisClick?: ((e: { component?: dxPolarChart, element?: dxElement, model?: any, event?: event, argument?: Date | number | string }) => any) | string;
    /**
     * A function that is executed when a legend item is clicked or tapped.
     */
    onLegendClick?: ((e: { component?: dxPolarChart, element?: dxElement, model?: any, event?: event, target?: polarChartSeriesObject }) => any) | string;
    /**
     * A function that is executed when a series is clicked or tapped.
     */
    onSeriesClick?: ((e: { component?: dxPolarChart, element?: dxElement, model?: any, event?: event, target?: polarChartSeriesObject }) => any) | string;
    /**
     * A function that is executed after the pointer enters or leaves a series.
     */
    onSeriesHoverChanged?: ((e: { component?: dxPolarChart, element?: dxElement, model?: any, target?: polarChartSeriesObject }) => any);
    /**
     * A function that is executed when a series is selected or selection is canceled.
     */
    onSeriesSelectionChanged?: ((e: { component?: dxPolarChart, element?: dxElement, model?: any, target?: polarChartSeriesObject }) => any);
    /**
     * A function that is executed when zooming or panning ends.
     */
    onZoomEnd?: ((e: { component?: dxPolarChart, element?: dxElement, model?: any, event?: event, axis?: chartAxisObject, range?: VizRange, previousRange?: VizRange, cancel?: boolean, actionType?: 'zoom' | 'pan', zoomFactor?: number, shift?: number }) => any);
    /**
     * A function that is executed when zooming or panning begins.
     */
    onZoomStart?: ((e: { component?: dxPolarChart, element?: dxElement, model?: any, event?: event, axis?: chartAxisObject, range?: VizRange, cancel?: boolean, actionType?: 'zoom' | 'pan' }) => any);
    /**
     * Specifies how the chart must behave when series point labels overlap.
     */
    resolveLabelOverlapping?: 'hide' | 'none';
    /**
     * Specifies properties for PolarChart UI component series.
     */
    series?: PolarChartSeries | Array<PolarChartSeries>;
    /**
     * Specifies whether a single series or multiple series can be selected in the chart.
     */
    seriesSelectionMode?: 'multiple' | 'single';
    /**
     * Defines properties for the series template.
     */
    seriesTemplate?: { customizeSeries?: ((seriesName: any) => PolarChartSeries), nameField?: string };
    /**
     * Configures tooltips.
     */
    tooltip?: dxPolarChartTooltip;
    /**
     * Indicates whether or not to display a 'spider web'.
     */
    useSpiderWeb?: boolean;
    /**
     * Specifies value axis properties for the PolarChart UI component.
     */
    valueAxis?: dxPolarChartValueAxis;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartAdaptiveLayout extends BaseChartAdaptiveLayout {
    /**
     * Specifies the minimum container height at which the layout begins to adapt.
     */
    height?: number;
    /**
     * Specifies the minimum container width at which the layout begins to adapt.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxis extends dxPolarChartCommonAxisSettings {
    /**
     * Specifies the desired type of axis values.
     */
    argumentType?: 'datetime' | 'numeric' | 'string';
    /**
     * Specifies the minimum distance between two neighboring major ticks in pixels. Applies only to the axes of the 'continuous' and 'logarithmic' types.
     */
    axisDivisionFactor?: number;
    /**
     * Specifies the order of categories on an axis of the 'discrete' type.
     */
    categories?: Array<number | string | Date>;
    /**
     * Defines an array of the argument axis constant lines.
     */
    constantLines?: Array<dxPolarChartArgumentAxisConstantLines>;
    /**
     * Specifies whether or not to display the first point at the angle specified by the startAngle property.
     */
    firstPointOnStartAngle?: boolean;
    /**
     * Specifies the elements that will be highlighted when the argument axis is hovered over.
     */
    hoverMode?: 'allArgumentPoints' | 'none';
    /**
     * Specifies properties for argument axis labels.
     */
    label?: dxPolarChartArgumentAxisLabel;
    /**
     * Specifies a value used to calculate the range on a logarithmic axis within which the axis should be linear. Applies only if the data source contains negative values or zeroes.
     */
    linearThreshold?: number;
    /**
     * Specifies the value to be raised to a power when generating ticks for a logarithmic axis.
     */
    logarithmBase?: number;
    /**
     * Specifies the properties of the minor ticks.
     */
    minorTick?: dxPolarChartArgumentAxisMinorTick;
    /**
     * Specifies the number of minor ticks between two neighboring major ticks.
     */
    minorTickCount?: number;
    /**
     * Specifies the interval between minor ticks.
     */
    minorTickInterval?: number | any | TimeIntervalType;
    /**
     * Specifies the value to be used as the origin for the argument axis.
     */
    originValue?: number;
    /**
     * Specifies the period of the argument values in the data source.
     */
    period?: number;
    /**
     * Specifies the angle in arc degrees to which the argument axis should be rotated. The positive values rotate the axis clockwise.
     */
    startAngle?: number;
    /**
     * Specifies properties for argument axis strips.
     */
    strips?: Array<dxPolarChartArgumentAxisStrips>;
    /**
     * An object defining the configuration properties for axis ticks.
     */
    tick?: dxPolarChartArgumentAxisTick;
    /**
     * Specifies an interval between axis ticks/grid lines.
     */
    tickInterval?: number | any | TimeIntervalType;
    /**
     * Specifies the required type of the argument axis.
     */
    type?: 'continuous' | 'discrete' | 'logarithmic';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxisConstantLines extends dxPolarChartCommonAxisSettingsConstantLineStyle {
    /**
     * Specifies whether to display the constant line behind or in front of the series.
     */
    displayBehindSeries?: boolean;
    /**
     * Specifies whether to extend the axis to display the constant line.
     */
    extendAxis?: boolean;
    /**
     * An object defining constant line label properties.
     */
    label?: dxPolarChartArgumentAxisConstantLinesLabel;
    /**
     * Specifies a value to be displayed by a constant line.
     */
    value?: number | Date | string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxisConstantLinesLabel extends dxPolarChartCommonAxisSettingsConstantLineStyleLabel {
    /**
     * Specifies the text to be displayed in a constant line label.
     */
    text?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxisLabel extends dxPolarChartCommonAxisSettingsLabel {
    /**
     * Specifies the text for a hint that appears when a user hovers the mouse pointer over a label on the argument axis.
     */
    customizeHint?: ((argument: { value?: Date | number | string, valueText?: string }) => string);
    /**
     * Specifies a callback function that returns the text to be displayed by argument axis labels.
     */
    customizeText?: ((argument: { value?: Date | number | string, valueText?: string }) => string);
    /**
     * Formats a value before it is displayed in an axis label.
     */
    format?: format;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxisMinorTick extends dxPolarChartCommonAxisSettingsMinorTick {
    /**
     * Shifts minor ticks from the reference position.
     */
    shift?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxisStrips extends dxPolarChartCommonAxisSettingsStripStyle {
    /**
     * Specifies a color for a strip.
     */
    color?: string;
    /**
     * Specifies an end value for a strip.
     */
    endValue?: number | Date | string;
    /**
     * An object that defines the label configuration properties of a strip.
     */
    label?: dxPolarChartArgumentAxisStripsLabel;
    /**
     * Specifies a start value for a strip.
     */
    startValue?: number | Date | string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxisStripsLabel extends dxPolarChartCommonAxisSettingsStripStyleLabel {
    /**
     * Specifies the text displayed in a strip.
     */
    text?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartArgumentAxisTick extends dxPolarChartCommonAxisSettingsTick {
    /**
     * Shifts ticks from the reference position.
     */
    shift?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettings {
    /**
     * Specifies whether to allow decimal values on the axis. When false, the axis contains integer values only.
     */
    allowDecimals?: boolean;
    /**
     * Specifies the color of the line that represents an axis.
     */
    color?: string;
    /**
     * Specifies the appearance of all the UI component's constant lines.
     */
    constantLineStyle?: dxPolarChartCommonAxisSettingsConstantLineStyle;
    /**
     * Specifies whether ticks/grid lines of a discrete axis are located between labels or cross the labels.
     */
    discreteAxisDivisionMode?: 'betweenLabels' | 'crossLabels';
    /**
     * Specifies whether to force the axis to start and end on ticks.
     */
    endOnTick?: boolean;
    /**
     * An object defining the configuration properties for the grid lines of an axis in the PolarChart UI component.
     */
    grid?: { color?: string, opacity?: number, visible?: boolean, width?: number };
    /**
     * Indicates whether or not an axis is inverted.
     */
    inverted?: boolean;
    /**
     * An object defining the label configuration properties that are common for all axes in the PolarChart UI component.
     */
    label?: dxPolarChartCommonAxisSettingsLabel;
    /**
     * Specifies the properties of the minor grid.
     */
    minorGrid?: { color?: string, opacity?: number, visible?: boolean, width?: number };
    /**
     * Specifies the properties of the minor ticks.
     */
    minorTick?: dxPolarChartCommonAxisSettingsMinorTick;
    /**
     * Specifies the opacity of the line that represents an axis.
     */
    opacity?: number;
    /**
     * An object defining configuration properties for strip style.
     */
    stripStyle?: dxPolarChartCommonAxisSettingsStripStyle;
    /**
     * An object defining the configuration properties for axis ticks.
     */
    tick?: dxPolarChartCommonAxisSettingsTick;
    /**
     * Indicates whether or not the line that represents an axis in a chart is visible.
     */
    visible?: boolean;
    /**
     * Specifies the width of the line that represents an axis in the chart.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettingsConstantLineStyle {
    /**
     * Specifies a color for a constant line.
     */
    color?: string;
    /**
     * Specifies a dash style for a constant line.
     */
    dashStyle?: DashStyleType;
    /**
     * An object defining constant line label properties.
     */
    label?: dxPolarChartCommonAxisSettingsConstantLineStyleLabel;
    /**
     * Specifies a constant line width in pixels.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettingsConstantLineStyleLabel {
    /**
     * Specifies font properties for a constant line label.
     */
    font?: Font;
    /**
     * Indicates whether or not to display labels for the axis constant lines.
     */
    visible?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettingsLabel {
    /**
     * Specifies font properties for axis labels.
     */
    font?: Font;
    /**
     * Specifies the spacing between an axis and its labels in pixels.
     */
    indentFromAxis?: number;
    /**
     * Decides how to arrange axis labels when there is not enough space to keep all of them.
     */
    overlappingBehavior?: 'none' | 'hide';
    /**
     * Indicates whether or not axis labels are visible.
     */
    visible?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettingsMinorTick {
    /**
     * Specifies a color for the minor ticks.
     */
    color?: string;
    /**
     * Specifies minor tick length.
     */
    length?: number;
    /**
     * Specifies an opacity for the minor ticks.
     */
    opacity?: number;
    /**
     * Indicates whether or not the minor ticks are displayed on an axis.
     */
    visible?: boolean;
    /**
     * Specifies minor tick width.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettingsStripStyle {
    /**
     * An object defining the configuration properties for a strip label style.
     */
    label?: dxPolarChartCommonAxisSettingsStripStyleLabel;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettingsStripStyleLabel {
    /**
     * Specifies font properties for a strip label.
     */
    font?: Font;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAxisSettingsTick {
    /**
     * Specifies ticks color.
     */
    color?: string;
    /**
     * Specifies tick length.
     */
    length?: number;
    /**
     * Specifies tick opacity.
     */
    opacity?: number;
    /**
     * Indicates whether or not ticks are visible on an axis.
     */
    visible?: boolean;
    /**
     * Specifies tick width.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonSeriesSettings extends dxPolarChartSeriesTypesCommonPolarChartSeries {
    /**
     * An object that specifies configuration properties for all series of the area type in the chart.
     */
    area?: any;
    /**
     * An object that specifies configuration properties for all series of the 'bar' type in the chart.
     */
    bar?: any;
    /**
     * An object that specifies configuration properties for all series of the 'line' type in the chart.
     */
    line?: any;
    /**
     * An object that specifies configuration properties for all series of the 'scatter' type in the chart.
     */
    scatter?: any;
    /**
     * An object that specifies configuration properties for all series of the 'stackedBar' type in the chart.
     */
    stackedbar?: any;
    /**
     * Sets a series type.
     */
    type?: PolarChartSeriesType;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartLegend extends BaseChartLegend {
    /**
     * Specifies the text for a hint that appears when a user hovers the mouse pointer over a legend item.
     */
    customizeHint?: ((seriesInfo: { seriesName?: any, seriesIndex?: number, seriesColor?: string }) => string);
    /**
     * Specifies a callback function that returns the text to be displayed by legend items.
     */
    customizeText?: ((seriesInfo: { seriesName?: any, seriesIndex?: number, seriesColor?: string }) => string);
    /**
     * Specifies what series elements to highlight when a corresponding item in the legend is hovered over.
     */
    hoverMode?: 'excludePoints' | 'includePoints' | 'none';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartTooltip extends BaseChartTooltip {
    /**
     * Specifies the kind of information to display in a tooltip.
     */
    shared?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartValueAxis extends dxPolarChartCommonAxisSettings {
    /**
     * Specifies a coefficient for dividing the value axis.
     */
    axisDivisionFactor?: number;
    /**
     * Specifies the order of categories on an axis of the 'discrete' type.
     */
    categories?: Array<number | string | Date>;
    /**
     * Defines an array of the value axis constant lines.
     */
    constantLines?: Array<dxPolarChartValueAxisConstantLines>;
    /**
     * Specifies whether to force the axis to start and end on ticks.
     */
    endOnTick?: boolean;
    /**
     * Specifies properties for value axis labels.
     */
    label?: dxPolarChartValueAxisLabel;
    /**
     * Specifies a value used to calculate the range on a logarithmic axis within which the axis should be linear. Applies only if the data source contains negative values or zeroes.
     */
    linearThreshold?: number;
    /**
     * Specifies the value to be raised to a power when generating ticks for a logarithmic axis.
     */
    logarithmBase?: number;
    /**
     * Specifies a coefficient that determines the spacing between the maximum series point and the axis.
     */
    maxValueMargin?: number;
    /**
     * Specifies a coefficient that determines the spacing between the minimum series point and the axis.
     */
    minValueMargin?: number;
    /**
     * Specifies the minimum length of the visual range.
     */
    minVisualRangeLength?: number | any | TimeIntervalType;
    /**
     * Specifies the number of minor ticks between two neighboring major ticks.
     */
    minorTickCount?: number;
    /**
     * Specifies the interval between minor ticks.
     */
    minorTickInterval?: number | any | TimeIntervalType;
    /**
     * Specifies whether or not to indicate a zero value on the value axis.
     */
    showZero?: boolean;
    /**
     * Specifies properties for value axis strips.
     */
    strips?: Array<dxPolarChartValueAxisStrips>;
    /**
     * An object defining the configuration properties for axis ticks.
     */
    tick?: dxPolarChartValueAxisTick;
    /**
     * Specifies an interval between axis ticks/grid lines.
     */
    tickInterval?: number | any | TimeIntervalType;
    /**
     * Specifies the required type of the value axis.
     */
    type?: 'continuous' | 'discrete' | 'logarithmic';
    /**
     * Indicates whether to display series with indents from axis boundaries.
     */
    valueMarginsEnabled?: boolean;
    /**
     * Specifies the desired type of axis values.
     */
    valueType?: 'datetime' | 'numeric' | 'string';
    /**
     * Defines the axis' displayed range. Cannot be wider than the wholeRange.
     */
    visualRange?: VizRange | Array<number | string | Date>;
    /**
     * Specifies how the axis's visual range should behave when the PolarChart data is updated.
     */
    visualRangeUpdateMode?: 'auto' | 'keep' | 'reset';
    /**
     * Defines the range where the axis can be zoomed.
     */
    wholeRange?: VizRange | Array<number | string | Date>;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartValueAxisConstantLines extends dxPolarChartCommonAxisSettingsConstantLineStyle {
    /**
     * Specifies whether to display the constant line behind or in front of the series.
     */
    displayBehindSeries?: boolean;
    /**
     * Specifies whether to extend the axis to display the constant line.
     */
    extendAxis?: boolean;
    /**
     * An object defining constant line label properties.
     */
    label?: dxPolarChartValueAxisConstantLinesLabel;
    /**
     * Specifies a value to be displayed by a constant line.
     */
    value?: number | Date | string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartValueAxisConstantLinesLabel extends dxPolarChartCommonAxisSettingsConstantLineStyleLabel {
    /**
     * Specifies the text to be displayed in a constant line label.
     */
    text?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartValueAxisLabel extends dxPolarChartCommonAxisSettingsLabel {
    /**
     * Specifies the text for a hint that appears when a user hovers the mouse pointer over a label on the value axis.
     */
    customizeHint?: ((axisValue: { value?: Date | number | string, valueText?: string }) => string);
    /**
     * Specifies a callback function that returns the text to be displayed in value axis labels.
     */
    customizeText?: ((axisValue: { value?: Date | number | string, valueText?: string }) => string);
    /**
     * Formats a value before it is displayed in an axis label.
     */
    format?: format;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartValueAxisStrips extends dxPolarChartCommonAxisSettingsStripStyle {
    /**
     * Specifies a color for a strip.
     */
    color?: string;
    /**
     * Specifies an end value for a strip.
     */
    endValue?: number | Date | string;
    /**
     * An object that defines the label configuration properties of a strip.
     */
    label?: dxPolarChartValueAxisStripsLabel;
    /**
     * Specifies a start value for a strip.
     */
    startValue?: number | Date | string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartValueAxisStripsLabel extends dxPolarChartCommonAxisSettingsStripStyleLabel {
    /**
     * Specifies the text displayed in a strip.
     */
    text?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartValueAxisTick extends dxPolarChartCommonAxisSettingsTick {
    /**
     * Indicates whether or not ticks are visible on an axis.
     */
    visible?: boolean;
}
/**
 * The PolarChart is a UI component that visualizes data in a polar coordinate system.
 */
export default class dxPolarChart extends BaseChart {
    constructor(element: Element, options?: dxPolarChartOptions)
    constructor(element: JQuery, options?: dxPolarChartOptions)
    /**
     * Gets a value axis.
     */
    getValueAxis(): chartAxisObject;
    /**
     * Resets the value axis' visual range to the data range or to the whole range if it is within the data range.
     */
    resetVisualRange(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartAnnotationConfig extends dxPolarChartCommonAnnotationConfig {
    /**
     * Specifies the annotation's name.
     */
    name?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartCommonAnnotationConfig extends BaseChartAnnotationConfig {
    /**
     * Specifies the angle between the startAngle and the radius.
     */
    angle?: number;
    /**
     * Places an annotation at the specified distance from the center of the UI component.
     */
    radius?: number;
    /**
     * 
     */
    customizeTooltip?: ((annotation: dxPolarChartAnnotationConfig | any) => any);
    /**
     * 
     */
    template?: template | ((annotation: dxPolarChartAnnotationConfig | any, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * 
     */
    tooltipTemplate?: template | ((annotation: dxPolarChartAnnotationConfig | any, element: dxElement) => string | Element | JQuery);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypes {
    /**
     * An object that defines configuration properties for polar chart series.
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    CommonPolarChartSeries?: dxPolarChartSeriesTypesCommonPolarChartSeries;
    /**
     * An object defining a series of the area type.
     */
    areapolarseries?: dxPolarChartSeriesTypesAreapolarseries;
    /**
     * An object defining a series of the bar type.
     */
    barpolarseries?: dxPolarChartSeriesTypesBarpolarseries;
    /**
     * An object defining a series of the line type.
     */
    linepolarseries?: dxPolarChartSeriesTypesLinepolarseries;
    /**
     * An object defining a series of the scatter type.
     */
    scatterpolarseries?: any;
    /**
     * An object defining a series of the stackedBar type.
     */
    stackedbarpolarseries?: dxPolarChartSeriesTypesStackedbarpolarseries;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesCommonPolarChartSeries {
    /**
     * Specifies the data source field that provides arguments for series points.
     */
    argumentField?: string;
    /**
     * Controls the padding and consequently the angular width of all bars in a series using relative units. Ignored if the barWidth property is set.
     */
    barPadding?: number;
    /**
     * Specifies a fixed angular width for all bars in a series, measured in degrees. Takes precedence over the barPadding property.
     */
    barWidth?: number;
    /**
     * An object defining the series border configuration properties.
     */
    border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number };
    /**
     * Specifies whether or not to close the chart by joining the end point with the first point.
     */
    closed?: boolean;
    /**
     * Specifies a series color.
     */
    color?: string;
    /**
     * Specifies the dash style of the series' line.
     */
    dashStyle?: DashStyleType;
    /**
     * Specifies the series elements to highlight when a series is hovered over.
     */
    hoverMode?: 'allArgumentPoints' | 'allSeriesPoints' | 'excludePoints' | 'includePoints' | 'nearestPoint' | 'none' | 'onlyPoint';
    /**
     * An object defining configuration properties for a hovered series.
     */
    hoverStyle?: { border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number }, color?: string, dashStyle?: DashStyleType, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number }, width?: number };
    /**
     * Specifies whether the series should ignore null data points.
     */
    ignoreEmptyPoints?: boolean;
    /**
     * An object defining the label configuration properties.
     */
    label?: dxPolarChartSeriesTypesCommonPolarChartSeriesLabel;
    /**
     * Specifies how many points are acceptable to be in a series to display all labels for these points. Otherwise, the labels will not be displayed.
     */
    maxLabelCount?: number;
    /**
     * Specifies the minimal length of a displayed bar in pixels.
     */
    minBarSize?: number;
    /**
     * Specifies opacity for a series.
     */
    opacity?: number;
    /**
     * An object defining configuration properties for points in line and area series.
     */
    point?: dxPolarChartSeriesTypesCommonPolarChartSeriesPoint;
    /**
     * Specifies the series elements to highlight when the series is selected.
     */
    selectionMode?: 'allArgumentPoints' | 'allSeriesPoints' | 'excludePoints' | 'includePoints' | 'none' | 'onlyPoint';
    /**
     * An object defining configuration properties for a selected series.
     */
    selectionStyle?: { border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number }, color?: string, dashStyle?: DashStyleType, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number }, width?: number };
    /**
     * Specifies whether or not to show the series in the chart's legend.
     */
    showInLegend?: boolean;
    /**
     * Specifies the name of the stack where the values of the 'stackedBar' series must be located.
     */
    stack?: string;
    /**
     * Specifies the name of the data source field that provides data about a point.
     */
    tagField?: string;
    /**
     * Configures error bars.
     */
    valueErrorBar?: { color?: string, displayMode?: 'auto' | 'high' | 'low' | 'none', edgeLength?: number, highValueField?: string, lineWidth?: number, lowValueField?: string, opacity?: number, type?: 'fixed' | 'percent' | 'stdDeviation' | 'stdError' | 'variance', value?: number };
    /**
     * Specifies the data source field that provides values for series points.
     */
    valueField?: string;
    /**
     * Specifies the visibility of a series.
     */
    visible?: boolean;
    /**
     * Specifies a line width.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesCommonPolarChartSeriesLabel {
    /**
     * Formats the point argument before it is displayed in the point label. To format the point value, use the format property.
     */
    argumentFormat?: format;
    /**
     * Colors the point labels' background. The default color is inherited from the points.
     */
    backgroundColor?: string;
    /**
     * Specifies border properties for point labels.
     */
    border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number };
    /**
     * Specifies connector properties for series point labels.
     */
    connector?: { color?: string, visible?: boolean, width?: number };
    /**
     * Specifies a callback function that returns the text to be displayed by point labels.
     */
    customizeText?: ((pointInfo: any) => string);
    /**
     * Specifies font properties for the text displayed in point labels.
     */
    font?: Font;
    /**
     * Formats a value before it is displayed in a point label.
     */
    format?: format;
    /**
     * Specifies a label position in bar-like series.
     */
    position?: 'inside' | 'outside';
    /**
     * Specifies the angle used to rotate point labels from their initial position.
     */
    rotationAngle?: number;
    /**
     * Specifies whether or not to show a label when the point has a zero value.
     */
    showForZeroValues?: boolean;
    /**
     * Specifies the visibility of point labels.
     */
    visible?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesCommonPolarChartSeriesPoint {
    /**
     * Specifies border properties for points in the line and area series.
     */
    border?: { color?: string, visible?: boolean, width?: number };
    /**
     * Specifies the points color.
     */
    color?: string;
    /**
     * Specifies what series points to highlight when a point is hovered over.
     */
    hoverMode?: 'allArgumentPoints' | 'allSeriesPoints' | 'none' | 'onlyPoint';
    /**
     * An object defining configuration properties for a hovered point.
     */
    hoverStyle?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, size?: number };
    /**
     * An object specifying the parameters of an image that is used as a point marker.
     */
    image?: string | { height?: number, url?: string, width?: number };
    /**
     * Specifies what series points to highlight when a point is selected.
     */
    selectionMode?: 'allArgumentPoints' | 'allSeriesPoints' | 'none' | 'onlyPoint';
    /**
     * An object defining configuration properties for a selected point.
     */
    selectionStyle?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, size?: number };
    /**
     * Specifies the point diameter in pixels for those series that represent data points as symbols (not as bars for instance).
     */
    size?: number;
    /**
     * Specifies a symbol for presenting points of the line and area series.
     */
    symbol?: 'circle' | 'cross' | 'polygon' | 'square' | 'triangle';
    /**
     * Specifies the points visibility for a line and area series.
     */
    visible?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesAreapolarseries extends dxPolarChartSeriesTypesCommonPolarChartSeries {
    /**
     * Specifies series elements to be highlighted when a user points to the series.
     */
    hoverMode?: 'nearestPoint' | 'includePoints' | 'excludePoints' | 'none';
    /**
     * An object defining configuration properties for points in line and area series.
     */
    point?: dxPolarChartSeriesTypesAreapolarseriesPoint;
    /**
     * Specifies series elements to be highlighted when a user selects the series.
     */
    selectionMode?: 'includePoints' | 'excludePoints' | 'none';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesAreapolarseriesPoint extends dxPolarChartSeriesTypesCommonPolarChartSeriesPoint {
    /**
     * Specifies the points visibility for a line and area series.
     */
    visible?: boolean;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesBarpolarseries extends dxPolarChartSeriesTypesCommonPolarChartSeries {
    /**
     * Specifies series elements to be highlighted when a user points to the series.
     */
    hoverMode?: 'onlyPoint' | 'allSeriesPoints' | 'allArgumentPoints' | 'none';
    /**
     * Specifies series elements to be highlighted when a user selects the series.
     */
    selectionMode?: 'onlyPoint' | 'allSeriesPoints' | 'allArgumentPoints' | 'none';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesLinepolarseries extends dxPolarChartSeriesTypesCommonPolarChartSeries {
    /**
     * Specifies series elements to be highlighted when a user points to the series.
     */
    hoverMode?: 'nearestPoint' | 'includePoints' | 'excludePoints' | 'none';
    /**
     * Specifies series elements to be highlighted when a user selects the series.
     */
    selectionMode?: 'includePoints' | 'excludePoints' | 'none';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesStackedbarpolarseries extends dxPolarChartSeriesTypesCommonPolarChartSeries {
    /**
     * Specifies series elements to be highlighted when a user points to the series.
     */
    hoverMode?: 'onlyPoint' | 'allSeriesPoints' | 'allArgumentPoints' | 'none';
    /**
     * An object defining the label configuration properties.
     */
    label?: dxPolarChartSeriesTypesStackedbarpolarseriesLabel;
    /**
     * Specifies series elements to be highlighted when a user selects the series.
     */
    selectionMode?: 'onlyPoint' | 'allSeriesPoints' | 'allArgumentPoints' | 'none';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxPolarChartSeriesTypesStackedbarpolarseriesLabel extends dxPolarChartSeriesTypesCommonPolarChartSeriesLabel {
    /**
     * Specifies a label position in bar-like series.
     */
    position?: 'inside' | 'outside';
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface polarChartSeriesObject extends baseSeriesObject {
}

declare global {
interface JQuery {
    dxPolarChart(): JQuery;
    dxPolarChart(options: "instance"): dxPolarChart;
    dxPolarChart(options: string): any;
    dxPolarChart(options: string, ...params: any[]): any;
    dxPolarChart(options: dxPolarChartOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxPolarChartOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxPolarChartOptions;
