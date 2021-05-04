/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

import dxDeferRendering, { IOptions } from "devextreme/ui/defer_rendering";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IDeferRenderingOptions extends IOptions, IHtmlOptions {
}
declare class DeferRendering extends BaseComponent<IDeferRenderingOptions> {
    get instance(): dxDeferRendering;
    protected _WidgetClass: typeof dxDeferRendering;
    protected independentEvents: string[];
    protected _expectedChildren: {
        animation: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IAnimationProps {
    complete?: any;
    delay?: any;
    direction?: any;
    duration?: any;
    easing?: any;
    from?: any;
    staggerDelay?: any;
    start?: any;
    to?: any;
    type?: any;
}
declare class Animation extends NestedOption<IAnimationProps> {
    static OptionName: string;
}
export default DeferRendering;
export { DeferRendering, IDeferRenderingOptions, Animation, IAnimationProps };
