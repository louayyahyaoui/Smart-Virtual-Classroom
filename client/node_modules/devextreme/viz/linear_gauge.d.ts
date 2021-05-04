/**
* DevExtreme (viz/linear_gauge.d.ts)
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
export interface dxLinearGaugeOptions extends BaseGaugeOptions<dxLinearGauge> {
    /**
     * Specifies the properties required to set the geometry of the LinearGauge UI component.
     */
    geometry?: { orientation?: 'horizontal' | 'vertical' };
    /**
     * Specifies gauge range container properties.
     */
    rangeContainer?: dxLinearGaugeRangeContainer;
    /**
     * Specifies the gauge's scale properties.
     */
    scale?: dxLinearGaugeScale;
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
export interface dxLinearGaugeRangeContainer extends BaseGaugeRangeContainer {
    /**
     * Specifies the orientation of the range container. Applies only if the geometry.orientation property is 'vertical'.
     */
    horizontalOrientation?: 'center' | 'left' | 'right';
    /**
     * Specifies the orientation of the range container. Applies only if the geometry.orientation property is 'horizontal'.
     */
    verticalOrientation?: 'bottom' | 'center' | 'top';
    /**
     * Specifies the width of the range container's start and end boundaries in the LinearGauge UI component.
     */
    width?: { end?: number, start?: number } | number;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxLinearGaugeScale extends BaseGaugeScale {
    /**
     * Specifies the orientation of scale ticks. Applies only if the geometry.orientation property is 'vertical'.
     */
    horizontalOrientation?: 'center' | 'left' | 'right';
    /**
     * Specifies common properties for scale labels.
     */
    label?: dxLinearGaugeScaleLabel;
    /**
     * Specifies the minimum distance between two neighboring major ticks in pixels.
     */
    scaleDivisionFactor?: number;
    /**
     * Specifies the orientation of scale ticks. Applies only if the geometry.orientation property is 'horizontal'.
     */
    verticalOrientation?: 'bottom' | 'center' | 'top';
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxLinearGaugeScaleLabel extends BaseGaugeScaleLabel {
    /**
     * Specifies the spacing between scale labels and ticks.
     */
    indentFromTick?: number;
}
/**
 * The LinearGauge is a UI component that indicates values on a linear numeric scale.
 */
export default class dxLinearGauge extends dxBaseGauge {
    constructor(element: Element, options?: dxLinearGaugeOptions)
    constructor(element: JQuery, options?: dxLinearGaugeOptions)
}

declare global {
interface JQuery {
    dxLinearGauge(): JQuery;
    dxLinearGauge(options: "instance"): dxLinearGauge;
    dxLinearGauge(options: string): any;
    dxLinearGauge(options: string, ...params: any[]): any;
    dxLinearGauge(options: dxLinearGaugeOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxLinearGaugeOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxLinearGaugeOptions;