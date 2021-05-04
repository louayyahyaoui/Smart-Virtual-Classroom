/**
* DevExtreme (viz/circular_gauge.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxBaseGauge,
    BaseGaugeOptions,
    BaseGaugeRangeContainer,
    BaseGaugeScale,
    BaseGaugeScaleLabel,
    GaugeIndicator
} from './gauges/base_gauge';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxCircularGaugeOptions extends BaseGaugeOptions<dxCircularGauge> {
    /**
     * Specifies the properties required to set the geometry of the CircularGauge UI component.
     */
    geometry?: { endAngle?: number, startAngle?: number };
    /**
     * Specifies gauge range container properties.
     */
    rangeContainer?: dxCircularGaugeRangeContainer;
    /**
     * Specifies a gauge's scale properties.
     */
    scale?: dxCircularGaugeScale;
    /**
     * Specifies the appearance properties of subvalue indicators.
     */
    subvalueIndicator?: GaugeIndicator;
    /**
     * Specifies the appearance properties of the value indicator.
     */
    valueIndicator?: GaugeIndicator;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxCircularGaugeRangeContainer extends BaseGaugeRangeContainer {
    /**
     * Specifies the orientation of the range container in the CircularGauge UI component.
     */
    orientation?: 'center' | 'inside' | 'outside';
    /**
     * Specifies the range container's width in pixels.
     */
    width?: number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxCircularGaugeScale extends BaseGaugeScale {
    /**
     * Specifies common properties for scale labels.
     */
    label?: dxCircularGaugeScaleLabel;
    /**
     * Specifies the orientation of scale ticks.
     */
    orientation?: 'center' | 'inside' | 'outside';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxCircularGaugeScaleLabel extends BaseGaugeScaleLabel {
    /**
     * Specifies which label to hide in case of overlapping.
     */
    hideFirstOrLast?: 'first' | 'last';
    /**
     * Specifies the spacing between scale labels and ticks.
     */
    indentFromTick?: number;
}
/**
 * The CircularGauge is a UI component that indicates values on a circular numeric scale.
 */
export default class dxCircularGauge extends dxBaseGauge {
    constructor(element: Element, options?: dxCircularGaugeOptions)
    constructor(element: JQuery, options?: dxCircularGaugeOptions)
}

declare global {
interface JQuery {
    dxCircularGauge(): JQuery;
    dxCircularGauge(options: "instance"): dxCircularGauge;
    dxCircularGauge(options: string): any;
    dxCircularGauge(options: string, ...params: any[]): any;
    dxCircularGauge(options: dxCircularGaugeOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxCircularGaugeOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxCircularGaugeOptions;