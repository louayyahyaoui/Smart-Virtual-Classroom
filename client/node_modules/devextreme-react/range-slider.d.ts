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

import dxRangeSlider, { IOptions } from "devextreme/ui/range_slider";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IRangeSliderOptions extends IOptions, IHtmlOptions {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class RangeSlider extends BaseComponent<IRangeSliderOptions> {
    get instance(): dxRangeSlider;
    protected _WidgetClass: typeof dxRangeSlider;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
    };
    protected _expectedChildren: {
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tooltip: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFormatProps {
    currency?: any;
    formatter?: any;
    parser?: any;
    precision?: any;
    type?: any;
}
declare class Format extends NestedOption<IFormatProps> {
    static OptionName: string;
}
interface ILabelProps {
    format?: any;
    position?: any;
    visible?: any;
}
declare class Label extends NestedOption<ILabelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ITooltipProps {
    enabled?: any;
    format?: any;
    position?: any;
    showMode?: any;
}
declare class Tooltip extends NestedOption<ITooltipProps> {
    static OptionName: string;
    static ExpectedChildren: {
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
export default RangeSlider;
export { RangeSlider, IRangeSliderOptions, Format, IFormatProps, Label, ILabelProps, Tooltip, ITooltipProps };
