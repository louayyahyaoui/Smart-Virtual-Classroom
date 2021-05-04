/**
* DevExtreme (viz/common.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxChartSeriesTypesCommonSeries
} from './chart';

import {
    Font
} from './core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type ChartSeriesType = 'area' | 'bar' | 'bubble' | 'candlestick' | 'fullstackedarea' | 'fullstackedbar' | 'fullstackedline' | 'fullstackedspline' | 'fullstackedsplinearea' | 'line' | 'rangearea' | 'rangebar' | 'scatter' | 'spline' | 'splinearea' | 'stackedarea' | 'stackedbar' | 'stackedline' | 'stackedspline' | 'stackedsplinearea' | 'steparea' | 'stepline' | 'stock';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type DashStyleType = 'dash' | 'dot' | 'longDash' | 'solid';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type TimeIntervalType = 'day' | 'hour' | 'millisecond' | 'minute' | 'month' | 'quarter' | 'second' | 'week' | 'year';
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type HatchingDirectionType = 'left' | 'none' | 'right';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseLegend {
    /**
     * Colors the legend's background.
     */
    backgroundColor?: string;
    /**
     * Configures the legend's border.
     */
    border?: { color?: string, cornerRadius?: number, dashStyle?: DashStyleType, opacity?: number, visible?: boolean, width?: number };
    /**
     * Arranges legend items into several columns.
     */
    columnCount?: number;
    /**
     * Specifies an empty space between item columns in pixels.
     */
    columnItemSpacing?: number;
    /**
     * Specifies the legend items' font properties.
     */
    font?: Font;
    /**
     * Along with verticalAlignment, specifies the legend's position.
     */
    horizontalAlignment?: 'center' | 'left' | 'right';
    /**
     * Specifies the text's position relative to the marker in a legend item.
     */
    itemTextPosition?: 'bottom' | 'left' | 'right' | 'top';
    /**
     * Aligns items in the last column or row (depending on the legend's orientation). Applies when legend items are not divided into columns or rows equally.
     */
    itemsAlignment?: 'center' | 'left' | 'right';
    /**
     * Generates an empty space, measured in pixels, around the legend.
     */
    margin?: number | { bottom?: number, left?: number, right?: number, top?: number };
    /**
     * Specifies the marker's size in a legend item in pixels.
     */
    markerSize?: number;
    /**
     * Arranges legend items vertically (in a column) or horizontally (in a row). The default value is 'horizontal' if the legend.horizontalAlignment is 'center'. Otherwise, it is 'vertical'.
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Generates an empty space, measured in pixels, between the legend's left/right border and its items.
     */
    paddingLeftRight?: number;
    /**
     * Generates an empty space, measured in pixels, between the legend's top/bottom border and its items.
     */
    paddingTopBottom?: number;
    /**
     * Arranges legend items in several rows.
     */
    rowCount?: number;
    /**
     * Specifies an empty space between item rows in pixels.
     */
    rowItemSpacing?: number;
    /**
     * Configures the legend title.
     */
    title?: { font?: Font, horizontalAlignment?: 'center' | 'left' | 'right', margin?: { bottom?: number, left?: number, right?: number, top?: number }, placeholderSize?: number, subtitle?: { font?: Font, offset?: number, text?: string } | string, text?: string, verticalAlignment?: 'bottom' | 'top' } | string;
    /**
     * Along with horizontalAlignment, specifies the legend's position.
     */
    verticalAlignment?: 'bottom' | 'top';
    /**
     * Specifies the legend's visibility.
     */
    visible?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseLegendItem {
    /**
     * A legend item marker.
     */
    marker?: { fill?: string, opacity?: number, size?: number, state?: 'normal' | 'hovered' | 'selected' };
    /**
     * The text that the legend item displays.
     */
    text?: string;
    /**
     * Indicates and specifies whether the legend item is visible.
     */
    visible?: boolean;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ChartSeries extends dxChartSeriesTypesCommonSeries {
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
    type?: ChartSeriesType;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ScaleBreak {
    /**
     * Along with the startValue property, limits the scale break.
     */
    endValue?: number | Date | string;
    /**
     * Along with the endValue property, limits the scale break.
     */
    startValue?: number | Date | string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface VizRange {
    /**
     * The range's end value.
     */
    endValue?: number | Date | string;
    /**
     * The range's length.
     */
    length?: number | any | TimeIntervalType;
    /**
     * The range's start value.
     */
    startValue?: number | Date | string;
}
