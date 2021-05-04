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
import dxFunnel, { IOptions } from "devextreme/viz/funnel";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IFunnelOptions extends IOptions, IHtmlOptions {
    defaultLoadingIndicator?: any;
    onLoadingIndicatorChange?: (value: any) => void;
}
declare class Funnel extends BaseComponent<IFunnelOptions> {
    get instance(): dxFunnel;
    protected _WidgetClass: typeof dxFunnel;
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
        funnelTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        legend: {
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
    cornerRadius?: any;
    opacity?: any;
}
declare class Border extends NestedOption<IBorderProps> {
    static OptionName: string;
}
interface IConnectorProps {
    color?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class Connector extends NestedOption<IConnectorProps> {
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
interface IFunnelTitleProps {
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
declare class FunnelTitle extends NestedOption<IFunnelTitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
        funnelTitleSubtitle: {
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
interface IFunnelTitleSubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class FunnelTitleSubtitle extends NestedOption<IFunnelTitleSubtitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
    hatching?: {
        direction?: any;
        opacity?: any;
        step?: any;
        width?: any;
    };
}
declare class HoverStyle extends NestedOption<IHoverStyleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        hatching: {
            optionName: string;
            isCollectionItem: boolean;
        };
        itemBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IItemProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    hoverStyle?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
    };
    selectionStyle?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
    };
}
declare class Item extends NestedOption<IItemProps> {
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
        itemBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        selectionStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IItemBorderProps {
    color?: any;
    visible?: any;
    width?: any;
}
declare class ItemBorder extends NestedOption<IItemBorderProps> {
    static OptionName: string;
}
interface ILabelProps {
    backgroundColor?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    connector?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    customizeText?: any;
    font?: any;
    format?: any;
    horizontalAlignment?: any;
    horizontalOffset?: any;
    position?: any;
    showForZeroValues?: any;
    textOverflow?: any;
    visible?: any;
    wordWrap?: any;
}
declare class Label extends NestedOption<ILabelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        connector: {
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
        labelBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ILabelBorderProps {
    color?: any;
    dashStyle?: any;
    visible?: any;
    width?: any;
}
declare class LabelBorder extends NestedOption<ILabelBorderProps> {
    static OptionName: string;
}
interface ILegendProps {
    backgroundColor?: any;
    border?: {
        color?: any;
        cornerRadius?: any;
        dashStyle?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    columnCount?: any;
    columnItemSpacing?: any;
    customizeHint?: any;
    customizeItems?: any;
    customizeText?: any;
    font?: any;
    horizontalAlignment?: any;
    itemsAlignment?: any;
    itemTextPosition?: any;
    margin?: {
        bottom?: any;
        left?: any;
        right?: any;
        top?: any;
    };
    markerSize?: any;
    markerTemplate?: any;
    orientation?: any;
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    rowCount?: any;
    rowItemSpacing?: any;
    title?: {
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
        };
        text?: any;
        verticalAlignment?: any;
    };
    verticalAlignment?: any;
    visible?: any;
    markerRender?: (...params: any) => React.ReactNode;
    markerComponent?: React.ComponentType<any>;
    markerKeyFn?: (data: any) => string;
}
declare class Legend extends NestedOption<ILegendProps> {
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
        legendBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        legendTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        margin: {
            optionName: string;
            isCollectionItem: boolean;
        };
        title: {
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
interface ILegendBorderProps {
    color?: any;
    cornerRadius?: any;
    dashStyle?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class LegendBorder extends NestedOption<ILegendBorderProps> {
    static OptionName: string;
}
interface ILegendTitleProps {
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
    };
    text?: any;
    verticalAlignment?: any;
}
declare class LegendTitle extends NestedOption<ILegendTitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
        legendTitleSubtitle: {
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
interface ILegendTitleSubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
}
declare class LegendTitleSubtitle extends NestedOption<ILegendTitleSubtitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
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
interface ISelectionStyleProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    hatching?: {
        direction?: any;
        opacity?: any;
        step?: any;
        width?: any;
    };
}
declare class SelectionStyle extends NestedOption<ISelectionStyleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        hatching: {
            optionName: string;
            isCollectionItem: boolean;
        };
        itemBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
    };
    text?: any;
    verticalAlignment?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class Title extends NestedOption<ITitleProps> {
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
export default Funnel;
export { Funnel, IFunnelOptions, AdaptiveLayout, IAdaptiveLayoutProps, Border, IBorderProps, Connector, IConnectorProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, FunnelTitle, IFunnelTitleProps, FunnelTitleSubtitle, IFunnelTitleSubtitleProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Item, IItemProps, ItemBorder, IItemBorderProps, Label, ILabelProps, LabelBorder, ILabelBorderProps, Legend, ILegendProps, LegendBorder, ILegendBorderProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, SelectionStyle, ISelectionStyleProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps };
