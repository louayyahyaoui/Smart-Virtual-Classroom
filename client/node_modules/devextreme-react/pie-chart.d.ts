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
import dxPieChart, { IOptions } from "devextreme/viz/pie_chart";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IPieChartOptions extends IOptions, IHtmlOptions {
    centerRender?: (...params: any) => React.ReactNode;
    centerComponent?: React.ComponentType<any>;
    centerKeyFn?: (data: any) => string;
    defaultLoadingIndicator?: any;
    onLoadingIndicatorChange?: (value: any) => void;
}
declare class PieChart extends BaseComponent<IPieChartOptions> {
    get instance(): dxPieChart;
    protected _WidgetClass: typeof dxPieChart;
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
        animation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        annotation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAnnotationSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonSeriesSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        export: {
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
        pieChartTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        series: {
            optionName: string;
            isCollectionItem: boolean;
        };
        seriesTemplate: {
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
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IAdaptiveLayoutProps {
    height?: any;
    keepLabels?: any;
    width?: any;
}
declare class AdaptiveLayout extends NestedOption<IAdaptiveLayoutProps> {
    static OptionName: string;
}
interface IAnimationProps {
    duration?: any;
    easing?: any;
    enabled?: any;
    maxPointCountSupported?: any;
}
declare class Animation extends NestedOption<IAnimationProps> {
    static OptionName: string;
}
interface IAnnotationProps {
    allowDragging?: any;
    argument?: any;
    arrowLength?: any;
    arrowWidth?: any;
    border?: {
        color?: any;
        cornerRadius?: any;
        dashStyle?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    customizeTooltip?: any;
    data?: any;
    description?: any;
    font?: any;
    height?: any;
    image?: {
        height?: any;
        url?: any;
        width?: any;
    };
    location?: any;
    name?: any;
    offsetX?: any;
    offsetY?: any;
    opacity?: any;
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    series?: any;
    shadow?: {
        blur?: any;
        color?: any;
        offsetX?: any;
        offsetY?: any;
        opacity?: any;
    };
    template?: any;
    text?: any;
    textOverflow?: any;
    tooltipEnabled?: any;
    tooltipTemplate?: any;
    type?: any;
    width?: any;
    wordWrap?: any;
    x?: any;
    y?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
    tooltipRender?: (...params: any) => React.ReactNode;
    tooltipComponent?: React.ComponentType<any>;
    tooltipKeyFn?: (data: any) => string;
}
declare class Annotation extends NestedOption<IAnnotationProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        annotationBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
        image: {
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
interface IAnnotationBorderProps {
    color?: any;
    cornerRadius?: any;
    dashStyle?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class AnnotationBorder extends NestedOption<IAnnotationBorderProps> {
    static OptionName: string;
}
interface IArgumentFormatProps {
    currency?: any;
    formatter?: any;
    parser?: any;
    precision?: any;
    type?: any;
}
declare class ArgumentFormat extends NestedOption<IArgumentFormatProps> {
    static OptionName: string;
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
interface ICommonAnnotationSettingsProps {
    allowDragging?: any;
    argument?: any;
    arrowLength?: any;
    arrowWidth?: any;
    border?: {
        color?: any;
        cornerRadius?: any;
        dashStyle?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    customizeTooltip?: any;
    data?: any;
    description?: any;
    font?: any;
    height?: any;
    image?: {
        height?: any;
        url?: any;
        width?: any;
    };
    location?: any;
    offsetX?: any;
    offsetY?: any;
    opacity?: any;
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    series?: any;
    shadow?: {
        blur?: any;
        color?: any;
        offsetX?: any;
        offsetY?: any;
        opacity?: any;
    };
    template?: any;
    text?: any;
    textOverflow?: any;
    tooltipEnabled?: any;
    tooltipTemplate?: any;
    type?: any;
    width?: any;
    wordWrap?: any;
    x?: any;
    y?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
    tooltipRender?: (...params: any) => React.ReactNode;
    tooltipComponent?: React.ComponentType<any>;
    tooltipKeyFn?: (data: any) => string;
}
declare class CommonAnnotationSettings extends NestedOption<ICommonAnnotationSettingsProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface ICommonSeriesSettingsProps {
    argumentField?: any;
    argumentType?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    hoverMode?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
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
    };
    label?: {
        argumentFormat?: any;
        backgroundColor?: any;
        border?: {
            color?: any;
            dashStyle?: any;
            visible?: any;
            width?: any;
        };
        connector?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        customizeText?: any;
        font?: any;
        format?: any;
        position?: any;
        radialOffset?: any;
        rotationAngle?: any;
        textOverflow?: any;
        visible?: any;
        wordWrap?: any;
    };
    maxLabelCount?: any;
    minSegmentSize?: any;
    selectionMode?: any;
    selectionStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
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
    };
    smallValuesGrouping?: {
        groupName?: any;
        mode?: any;
        threshold?: any;
        topCount?: any;
    };
    tagField?: any;
    valueField?: any;
}
declare class CommonSeriesSettings extends NestedOption<ICommonSeriesSettingsProps> {
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
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        selectionStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        seriesBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        smallValuesGrouping: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IConnectorProps {
    color?: any;
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
        dashStyle?: any;
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
        seriesBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IImageProps {
    height?: any;
    url?: any;
    width?: any;
}
declare class Image extends NestedOption<IImageProps> {
    static OptionName: string;
}
interface ILabelProps {
    argumentFormat?: any;
    backgroundColor?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    connector?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    customizeText?: any;
    font?: any;
    format?: any;
    position?: any;
    radialOffset?: any;
    rotationAngle?: any;
    textOverflow?: any;
    visible?: any;
    wordWrap?: any;
}
declare class Label extends NestedOption<ILabelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        argumentFormat: {
            optionName: string;
            isCollectionItem: boolean;
        };
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
        seriesBorder: {
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
    hoverMode?: any;
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
        annotationBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        font: {
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
interface IPieChartTitleProps {
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
declare class PieChartTitle extends NestedOption<IPieChartTitleProps> {
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
        pieChartTitleSubtitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        subtitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPieChartTitleSubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class PieChartTitleSubtitle extends NestedOption<IPieChartTitleSubtitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ISelectionStyleProps {
    border?: {
        color?: any;
        dashStyle?: any;
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
        seriesBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ISeriesProps {
    argumentField?: any;
    argumentType?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    hoverMode?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
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
    };
    label?: {
        argumentFormat?: any;
        backgroundColor?: any;
        border?: {
            color?: any;
            dashStyle?: any;
            visible?: any;
            width?: any;
        };
        connector?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        customizeText?: any;
        font?: any;
        format?: any;
        position?: any;
        radialOffset?: any;
        rotationAngle?: any;
        textOverflow?: any;
        visible?: any;
        wordWrap?: any;
    };
    maxLabelCount?: any;
    minSegmentSize?: any;
    name?: any;
    selectionMode?: any;
    selectionStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
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
    };
    smallValuesGrouping?: {
        groupName?: any;
        mode?: any;
        threshold?: any;
        topCount?: any;
    };
    tag?: any;
    tagField?: any;
    valueField?: any;
}
declare class Series extends NestedOption<ISeriesProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface ISeriesBorderProps {
    color?: any;
    dashStyle?: any;
    visible?: any;
    width?: any;
}
declare class SeriesBorder extends NestedOption<ISeriesBorderProps> {
    static OptionName: string;
}
interface ISeriesTemplateProps {
    customizeSeries?: any;
    nameField?: any;
}
declare class SeriesTemplate extends NestedOption<ISeriesTemplateProps> {
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
interface ISmallValuesGroupingProps {
    groupName?: any;
    mode?: any;
    threshold?: any;
    topCount?: any;
}
declare class SmallValuesGrouping extends NestedOption<ISmallValuesGroupingProps> {
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
    argumentFormat?: any;
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
    shared?: any;
    zIndex?: any;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
}
declare class Tooltip extends NestedOption<ITooltipProps> {
    static OptionName: string;
    static ExpectedChildren: {
        argumentFormat: {
            optionName: string;
            isCollectionItem: boolean;
        };
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
export default PieChart;
export { PieChart, IPieChartOptions, AdaptiveLayout, IAdaptiveLayoutProps, Animation, IAnimationProps, Annotation, IAnnotationProps, AnnotationBorder, IAnnotationBorderProps, ArgumentFormat, IArgumentFormatProps, Border, IBorderProps, CommonAnnotationSettings, ICommonAnnotationSettingsProps, CommonSeriesSettings, ICommonSeriesSettingsProps, Connector, IConnectorProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Image, IImageProps, Label, ILabelProps, Legend, ILegendProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, PieChartTitle, IPieChartTitleProps, PieChartTitleSubtitle, IPieChartTitleSubtitleProps, SelectionStyle, ISelectionStyleProps, Series, ISeriesProps, SeriesBorder, ISeriesBorderProps, SeriesTemplate, ISeriesTemplateProps, Shadow, IShadowProps, Size, ISizeProps, SmallValuesGrouping, ISmallValuesGroupingProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps };
