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
import dxBarGauge, { IOptions } from "devextreme/viz/bar_gauge";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IBarGaugeOptions extends IOptions, IHtmlOptions {
    defaultLoadingIndicator?: any;
    defaultValues?: any;
    onLoadingIndicatorChange?: (value: any) => void;
    onValuesChange?: (value: any) => void;
}
declare class BarGauge extends BaseComponent<IBarGaugeOptions> {
    get instance(): dxBarGauge;
    protected _WidgetClass: typeof dxBarGauge;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultLoadingIndicator: string;
        defaultValues: string;
    };
    protected _expectedChildren: {
        animation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        barGaugeTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        export: {
            optionName: string;
            isCollectionItem: boolean;
        };
        geometry: {
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
interface IAnimationProps {
    duration?: any;
    easing?: any;
    enabled?: any;
}
declare class Animation extends NestedOption<IAnimationProps> {
    static OptionName: string;
}
interface IBarGaugeTitleProps {
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
declare class BarGaugeTitle extends NestedOption<IBarGaugeTitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        barGaugeTitleSubtitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
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
interface IBarGaugeTitleSubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class BarGaugeTitleSubtitle extends NestedOption<IBarGaugeTitleSubtitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IBorderProps {
    color?: any;
    cornerRadius?: any;
    dashStyle?: any;
    opacity?: any;
    visible?: any;
    width?: any;
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
interface IGeometryProps {
    endAngle?: any;
    startAngle?: any;
}
declare class Geometry extends NestedOption<IGeometryProps> {
    static OptionName: string;
}
interface IItemTextFormatProps {
    currency?: any;
    formatter?: any;
    parser?: any;
    precision?: any;
    type?: any;
}
declare class ItemTextFormat extends NestedOption<IItemTextFormatProps> {
    static OptionName: string;
}
interface ILabelProps {
    connectorColor?: any;
    connectorWidth?: any;
    customizeText?: any;
    font?: any;
    format?: any;
    indent?: any;
    visible?: any;
}
declare class Label extends NestedOption<ILabelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
    itemTextFormat?: any;
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
        itemTextFormat: {
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
export default BarGauge;
export { BarGauge, IBarGaugeOptions, Animation, IAnimationProps, BarGaugeTitle, IBarGaugeTitleProps, BarGaugeTitleSubtitle, IBarGaugeTitleSubtitleProps, Border, IBorderProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Geometry, IGeometryProps, ItemTextFormat, IItemTextFormatProps, Label, ILabelProps, Legend, ILegendProps, LegendBorder, ILegendBorderProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps };
