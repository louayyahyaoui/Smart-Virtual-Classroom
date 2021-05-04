/**
* DevExtreme (viz/range_selector.d.ts)
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
    dxChartCommonSeriesSettings
} from './chart';

import {
    ChartSeries,
    ScaleBreak,
    VizRange,
    TimeIntervalType
} from './common';

import BaseWidget, {
    BaseWidgetOptions,
    Font
} from './core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxRangeSelectorOptions extends BaseWidgetOptions<dxRangeSelector> {
    /**
     * Specifies the properties for the range selector's background.
     */
    background?: { color?: string, image?: { location?: 'center' | 'centerBottom' | 'centerTop' | 'full' | 'leftBottom' | 'leftCenter' | 'leftTop' | 'rightBottom' | 'rightCenter' | 'rightTop', url?: string }, visible?: boolean };
    /**
     * Specifies the RangeSelector's behavior properties.
     */
    behavior?: { allowSlidersSwap?: boolean, animationEnabled?: boolean, callValueChanged?: 'onMoving' | 'onMovingComplete', manualRangeSelectionEnabled?: boolean, moveSelectedRangeByClick?: boolean, snapToTicks?: boolean };
    /**
     * Specifies the properties required to display a chart as the range selector's background.
     */
    chart?: { barGroupPadding?: number, barGroupWidth?: number, bottomIndent?: number, commonSeriesSettings?: dxChartCommonSeriesSettings, dataPrepareSettings?: { checkTypeForAllData?: boolean, convertToAxisDataType?: boolean, sortingMethod?: boolean | ((a: { arg?: Date | number | string, val?: Date | number | string }, b: { arg?: Date | number | string, val?: Date | number | string }) => number) }, maxBubbleSize?: number, minBubbleSize?: number, negativesAsZeroes?: boolean, palette?: Array<string> | PaletteType, paletteExtensionMode?: PaletteExtensionModeType, series?: ChartSeries | Array<ChartSeries>, seriesTemplate?: { customizeSeries?: ((seriesName: any) => ChartSeries), nameField?: string }, topIndent?: number, valueAxis?: { inverted?: boolean, logarithmBase?: number, max?: number, min?: number, type?: 'continuous' | 'logarithmic', valueType?: 'datetime' | 'numeric' | 'string' } };
    /**
     * Specifies the color of the parent page element.
     */
    containerBackgroundColor?: string;
    /**
     * Specifies a data source for the scale values and for the chart at the background.
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * Specifies the data source field that provides data for the scale.
     */
    dataSourceField?: string;
    /**
     * Range selector's indent properties.
     */
    indent?: { left?: number, right?: number };
    /**
     * A function that is executed after the UI component's value is changed.
     */
    onValueChanged?: ((e: { component?: dxRangeSelector, element?: dxElement, model?: any, value?: Array<number | string | Date>, previousValue?: Array<number | string | Date>, event?: event }) => any);
    /**
     * Specifies properties of the range selector's scale.
     */
    scale?: { aggregateByCategory?: boolean, aggregationGroupWidth?: number, aggregationInterval?: number | any | TimeIntervalType, allowDecimals?: boolean, breakStyle?: { color?: string, line?: 'straight' | 'waved', width?: number }, breaks?: Array<ScaleBreak>, categories?: Array<number | string | Date>, endOnTick?: boolean, endValue?: number | Date | string, holidays?: Array<Date | string> | Array<number>, label?: { customizeText?: ((scaleValue: { value?: Date | number | string, valueText?: string }) => string), font?: Font, format?: format, overlappingBehavior?: 'hide' | 'none', topIndent?: number, visible?: boolean }, linearThreshold?: number, logarithmBase?: number, marker?: { label?: { customizeText?: ((markerValue: { value?: Date | number, valueText?: string }) => string), format?: format }, separatorHeight?: number, textLeftIndent?: number, textTopIndent?: number, topIndent?: number, visible?: boolean }, maxRange?: number | any | TimeIntervalType, minRange?: number | any | TimeIntervalType, minorTick?: { color?: string, opacity?: number, visible?: boolean, width?: number }, minorTickCount?: number, minorTickInterval?: number | any | TimeIntervalType, placeholderHeight?: number, showCustomBoundaryTicks?: boolean, singleWorkdays?: Array<Date | string> | Array<number>, startValue?: number | Date | string, tick?: { color?: string, opacity?: number, width?: number }, tickInterval?: number | any | TimeIntervalType, type?: 'continuous' | 'discrete' | 'logarithmic' | 'semidiscrete', valueType?: 'datetime' | 'numeric' | 'string', workWeek?: Array<number>, workdaysOnly?: boolean };
    /**
     * Specifies the color of the selected range.
     */
    selectedRangeColor?: string;
    /**
     * Specifies how the selected range should behave when data is updated. Applies only when the RangeSelector is bound to a data source.
     */
    selectedRangeUpdateMode?: 'auto' | 'keep' | 'reset' | 'shift';
    /**
     * Specifies range selector shutter properties.
     */
    shutter?: { color?: string, opacity?: number };
    /**
     * Specifies the appearance of the range selector's slider handles.
     */
    sliderHandle?: { color?: string, opacity?: number, width?: number };
    /**
     * Defines the properties of the range selector slider markers.
     */
    sliderMarker?: { color?: string, customizeText?: ((scaleValue: { value?: Date | number | string, valueText?: string }) => string), font?: Font, format?: format, invalidRangeColor?: string, paddingLeftRight?: number, paddingTopBottom?: number, placeholderHeight?: number, visible?: boolean };
    /**
     * The selected range (initial or current). Equals the entire scale when not set.
     */
    value?: Array<number | string | Date> | VizRange;
}
/**
 * The RangeSelector is a UI component that allows a user to select a range of values on a scale.
 */
export default class dxRangeSelector extends BaseWidget {
    constructor(element: Element, options?: dxRangeSelectorOptions)
    constructor(element: JQuery, options?: dxRangeSelectorOptions)
    getDataSource(): DataSource;
    /**
     * Gets the currently selected range.
     */
    getValue(): Array<number | string | Date>;
    render(): void;
    /**
     * Redraws the UI component.
     */
    render(skipChartAnimation: boolean): void;
    /**
     * Sets the selected range.
     */
    setValue(value: Array<number | string | Date> | VizRange): void;
}

declare global {
interface JQuery {
    dxRangeSelector(): JQuery;
    dxRangeSelector(options: "instance"): dxRangeSelector;
    dxRangeSelector(options: string): any;
    dxRangeSelector(options: string, ...params: any[]): any;
    dxRangeSelector(options: dxRangeSelectorOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxRangeSelectorOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxRangeSelectorOptions;