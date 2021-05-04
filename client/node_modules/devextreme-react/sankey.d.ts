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
import dxSankey, { IOptions } from "devextreme/viz/sankey";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ISankeyOptions extends IOptions, IHtmlOptions {
    defaultLoadingIndicator?: any;
    onLoadingIndicatorChange?: (value: any) => void;
}
declare class Sankey extends BaseComponent<ISankeyOptions> {
    get instance(): dxSankey;
    protected _WidgetClass: typeof dxSankey;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultLoadingIndicator: string;
    };
    protected _expectedChildren: {
        adaptiveLayout: {
            optionName: string;
            isCollectionItem: boolean;
        };
        export: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        link: {
            optionName: string;
            isCollectionItem: boolean;
        };
        loadingIndicator: {
            optionName: string;
            isCollectionItem: boolean;
        };
        margin: {
            optionName: string;
            isCollectionItem: boolean;
        };
        node: {
            optionName: string;
            isCollectionItem: boolean;
        };
        size: {
            optionName: string;
            isCollectionItem: boolean;
        };
        title: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tooltip: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IAdaptiveLayoutProps {
    height?: any;
    keepLabels?: any;
    width?: any;
}
declare class AdaptiveLayout extends NestedOption<IAdaptiveLayoutProps> {
    static OptionName: string;
}
interface IBorderProps {
    color?: any;
    visible?: any;
    width?: any;
    dashStyle?: any;
    opacity?: any;
}
declare class Border extends NestedOption<IBorderProps> {
    static OptionName: string;
}
interface IExportProps {
    backgroundColor?: any;
    enabled?: any;
    fileName?: any;
    formats?: any;
    margin?: any;
    printingEnabled?: any;
    proxyUrl?: any;
    svgToCanvas?: any;
}
declare class Export extends NestedOption<IExportProps> {
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
interface IHatchingProps {
    direction?: any;
    opacity?: any;
    step?: any;
    width?: any;
}
declare class Hatching extends NestedOption<IHatchingProps> {
    static OptionName: string;
}
interface IHoverStyleProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    hatching?: {
        direction?: any;
        opacity?: any;
        step?: any;
        width?: any;
    };
    opacity?: any;
}
declare class HoverStyle extends NestedOption<IHoverStyleProps> {
    static OptionName: string;
}
interface ILabelProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    customizeText?: any;
    font?: any;
    horizontalOffset?: any;
    overlappingBehavior?: any;
    shadow?: {
        blur?: any;
        color?: any;
        offsetX?: any;
        offsetY?: any;
        opacity?: any;
    };
    useNodeColors?: any;
    verticalOffset?: any;
    visible?: any;
}
declare class Label extends NestedOption<ILabelProps> {
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
        sankeyborder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        shadow: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ILinkProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    colorMode?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
        opacity?: any;
    };
    opacity?: any;
}
declare class Link extends NestedOption<ILinkProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        hoverStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        sankeyborder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ILoadingIndicatorProps {
    backgroundColor?: any;
    enabled?: any;
    font?: any;
    show?: any;
    text?: any;
    defaultShow?: any;
    onShowChange?: (value: any) => void;
}
declare class LoadingIndicator extends NestedOption<ILoadingIndicatorProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultShow: string;
    };
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
interface INodeProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
        opacity?: any;
    };
    opacity?: any;
    padding?: any;
    width?: any;
}
declare class Node extends NestedOption<INodeProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        hoverStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        sankeyborder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ISankeyborderProps {
    color?: any;
    visible?: any;
    width?: any;
}
declare class Sankeyborder extends NestedOption<ISankeyborderProps> {
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
interface ISubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class Subtitle extends NestedOption<ISubtitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ITitleProps {
    font?: any;
    horizontalAlignment?: any;
    margin?: {
        bottom?: any;
        left?: any;
        right?: any;
        top?: any;
    };
    placeholderSize?: any;
    subtitle?: {
        font?: any;
        offset?: any;
        text?: any;
        textOverflow?: any;
        wordWrap?: any;
    };
    text?: any;
    textOverflow?: any;
    verticalAlignment?: any;
    wordWrap?: any;
}
declare class Title extends NestedOption<ITitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
        margin: {
            optionName: string;
            isCollectionItem: boolean;
        };
        subtitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
    cornerRadius?: any;
    customizeLinkTooltip?: any;
    customizeNodeTooltip?: any;
    enabled?: any;
    font?: any;
    format?: any;
    linkTooltipTemplate?: any;
    nodeTooltipTemplate?: any;
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
    linkTooltipRender?: (...params: any) => React.ReactNode;
    linkTooltipComponent?: React.ComponentType<any>;
    linkTooltipKeyFn?: (data: any) => string;
    nodeTooltipRender?: (...params: any) => React.ReactNode;
    nodeTooltipComponent?: React.ComponentType<any>;
    nodeTooltipKeyFn?: (data: any) => string;
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
        tooltipBorder: {
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
interface ITooltipBorderProps {
    color?: any;
    dashStyle?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class TooltipBorder extends NestedOption<ITooltipBorderProps> {
    static OptionName: string;
}
export default Sankey;
export { Sankey, ISankeyOptions, AdaptiveLayout, IAdaptiveLayoutProps, Border, IBorderProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Label, ILabelProps, Link, ILinkProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, Node, INodeProps, Sankeyborder, ISankeyborderProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps };
