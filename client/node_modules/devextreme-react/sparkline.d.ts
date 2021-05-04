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

/// <reference types="react" />
import dxSparkline, { IOptions } from "devextreme/viz/sparkline";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ISparklineOptions extends IOptions, IHtmlOptions {
}
declare class Sparkline extends BaseComponent<ISparklineOptions> {
    get instance(): dxSparkline;
    protected _WidgetClass: typeof dxSparkline;
    protected independentEvents: string[];
    protected _expectedChildren: {
        margin: {
            optionName: string;
            isCollectionItem: boolean;
        };
        size: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tooltip: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IBorderProps {
    color?: any;
    dashStyle?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class Border extends NestedOption<IBorderProps> {
    static OptionName: string;
}
interface IFontProps {
    color?: any;
    family?: any;
    opacity?: any;
    size?: any;
    weight?: any;
}
declare class Font extends NestedOption<IFontProps> {
    static OptionName: string;
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
interface IMarginProps {
    bottom?: any;
    left?: any;
    right?: any;
    top?: any;
}
declare class Margin extends NestedOption<IMarginProps> {
    static OptionName: string;
}
interface IShadowProps {
    blur?: any;
    color?: any;
    offsetX?: any;
    offsetY?: any;
    opacity?: any;
}
declare class Shadow extends NestedOption<IShadowProps> {
    static OptionName: string;
}
interface ISizeProps {
    height?: any;
    width?: any;
}
declare class Size extends NestedOption<ISizeProps> {
    static OptionName: string;
}
interface ITooltipProps {
    arrowLength?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    container?: any;
    contentTemplate?: any;
    cornerRadius?: any;
    customizeTooltip?: any;
    enabled?: any;
    font?: any;
    format?: any;
    interactive?: any;
    opacity?: any;
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    shadow?: {
        blur?: any;
        color?: any;
        offsetX?: any;
        offsetY?: any;
        opacity?: any;
    };
    zIndex?: any;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
}
declare class Tooltip extends NestedOption<ITooltipProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
        shadow: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default Sparkline;
export { Sparkline, ISparklineOptions, Border, IBorderProps, Font, IFontProps, Format, IFormatProps, Margin, IMarginProps, Shadow, IShadowProps, Size, ISizeProps, Tooltip, ITooltipProps };
