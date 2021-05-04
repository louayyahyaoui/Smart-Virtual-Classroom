/**
* DevExtreme (viz/bullet.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import BaseSparkline, {
    BaseSparklineOptions
} from './sparklines/base_sparkline';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxBulletOptions extends BaseSparklineOptions<dxBullet> {
    /**
     * Specifies a color for the bullet bar.
     */
    color?: string;
    /**
     * Specifies an end value for the invisible scale.
     */
    endScaleValue?: number;
    /**
     * Specifies whether or not to show the target line.
     */
    showTarget?: boolean;
    /**
     * Specifies whether or not to show the line indicating zero on the invisible scale.
     */
    showZeroLevel?: boolean;
    /**
     * Specifies a start value for the invisible scale.
     */
    startScaleValue?: number;
    /**
     * Specifies the value indicated by the target line.
     */
    target?: number;
    /**
     * Specifies a color for both the target and zero level lines.
     */
    targetColor?: string;
    /**
     * Specifies the width of the target line.
     */
    targetWidth?: number;
    /**
     * Specifies the primary value indicated by the bullet bar.
     */
    value?: number;
}
/**
 * The Bullet UI component is useful when you need to compare a single measure to a target value. The UI component comprises a horizontal bar indicating the measure and a vertical line indicating the target value.
 */
export default class dxBullet extends BaseSparkline {
    constructor(element: Element, options?: dxBulletOptions)
    constructor(element: JQuery, options?: dxBulletOptions)
}

declare global {
interface JQuery {
    dxBullet(): JQuery;
    dxBullet(options: "instance"): dxBullet;
    dxBullet(options: string): any;
    dxBullet(options: string, ...params: any[]): any;
    dxBullet(options: dxBulletOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxBulletOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxBulletOptions;