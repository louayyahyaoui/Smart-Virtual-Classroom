/**
* DevExtreme (viz/sparklines/base_sparkline.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../../core/element';

import {
    template
} from '../../core/templates/template';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip
} from '../core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseSparklineOptions<T = BaseSparkline> extends BaseWidgetOptions<T> {
    /**
     * A function that is executed when a tooltip becomes hidden.
     */
    onTooltipHidden?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed when a tooltip appears.
     */
    onTooltipShown?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * Configures the tooltip.
     */
    tooltip?: BaseSparklineTooltip;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface BaseSparklineTooltip extends BaseWidgetTooltip {
    /**
     * Specifies a custom template for tooltips.
     */
    contentTemplate?: template | ((pointsInfo: any, element: dxElement) => string | Element | JQuery);
    /**
     * Allows you to change tooltip appearance.
     */
    customizeTooltip?: ((pointsInfo: any) => any);
    /**
     * Enables tooltips.
     */
    enabled?: boolean;
    /**
     * 
     */
    interactive?: boolean;
}
/**
 * Overridden by descriptions for particular UI components.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class BaseSparkline extends BaseWidget {
    constructor(element: Element, options?: BaseSparklineOptions)
    constructor(element: JQuery, options?: BaseSparklineOptions)
}
