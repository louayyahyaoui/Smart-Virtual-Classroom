/**
* DevExtreme (viz/sparkline.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import BaseSparkline, {
    BaseSparklineOptions
} from './sparklines/base_sparkline';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSparklineOptions extends BaseSparklineOptions<dxSparkline> {
    /**
     * 
     */
    argumentField?: string;
    /**
     * 
     */
    barNegativeColor?: string;
    /**
     * 
     */
    barPositiveColor?: string;
    /**
     * 
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * 
     */
    firstLastColor?: string;
    /**
     * 
     */
    ignoreEmptyPoints?: boolean;
    /**
     * 
     */
    lineColor?: string;
    /**
     * 
     */
    lineWidth?: number;
    /**
     * 
     */
    lossColor?: string;
    /**
     * 
     */
    maxColor?: string;
    /**
     * 
     */
    maxValue?: number;
    /**
     * 
     */
    minColor?: string;
    /**
     * 
     */
    minValue?: number;
    /**
     * 
     */
    pointColor?: string;
    /**
     * 
     */
    pointSize?: number;
    /**
     * 
     */
    pointSymbol?: 'circle' | 'cross' | 'polygon' | 'square' | 'triangle';
    /**
     * 
     */
    showFirstLast?: boolean;
    /**
     * 
     */
    showMinMax?: boolean;
    /**
     * 
     */
    type?: 'area' | 'bar' | 'line' | 'spline' | 'splinearea' | 'steparea' | 'stepline' | 'winloss';
    /**
     * 
     */
    valueField?: string;
    /**
     * 
     */
    winColor?: string;
    /**
     * 
     */
    winlossThreshold?: number;
}
/**
 * The Sparkline UI component is a compact chart that contains only one series. Owing to their size, sparklines occupy very little space and can be easily collected in a table or embedded straight in text.
 */
export default class dxSparkline extends BaseSparkline {
    constructor(element: Element, options?: dxSparklineOptions)
    constructor(element: JQuery, options?: dxSparklineOptions)
    getDataSource(): DataSource;
}

declare global {
interface JQuery {
    dxSparkline(): JQuery;
    dxSparkline(options: "instance"): dxSparkline;
    dxSparkline(options: string): any;
    dxSparkline(options: string, ...params: any[]): any;
    dxSparkline(options: dxSparklineOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSparklineOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSparklineOptions;