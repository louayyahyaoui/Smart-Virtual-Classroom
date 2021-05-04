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
import dxVectorMap, { IOptions } from "devextreme/viz/vector_map";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IVectorMapOptions extends IOptions, IHtmlOptions {
    defaultLoadingIndicator?: any;
    onLoadingIndicatorChange?: (value: any) => void;
}
declare class VectorMap extends BaseComponent<IVectorMapOptions> {
    get instance(): dxVectorMap;
    protected _WidgetClass: typeof dxVectorMap;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultLoadingIndicator: string;
    };
    protected _expectedChildren: {
        annotation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        background: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAnnotationSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        controlBar: {
            optionName: string;
            isCollectionItem: boolean;
        };
        export: {
            optionName: string;
            isCollectionItem: boolean;
        };
        layer: {
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
        projection: {
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
        vectorMapTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IAnnotationProps {
    allowDragging?: any;
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
    coordinates?: any;
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
    name?: any;
    offsetX?: any;
    offsetY?: any;
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
interface IBackgroundProps {
    borderColor?: any;
    color?: any;
}
declare class Background extends NestedOption<IBackgroundProps> {
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
    coordinates?: any;
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
    offsetX?: any;
    offsetY?: any;
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
interface IControlBarProps {
    borderColor?: any;
    color?: any;
    enabled?: any;
    horizontalAlignment?: any;
    margin?: any;
    opacity?: any;
    verticalAlignment?: any;
}
declare class ControlBar extends NestedOption<IControlBarProps> {
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
interface IImageProps {
    height?: any;
    url?: any;
    width?: any;
}
declare class Image extends NestedOption<IImageProps> {
    static OptionName: string;
}
interface ILabelProps {
    dataField?: any;
    enabled?: any;
    font?: any;
}
declare class Label extends NestedOption<ILabelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ILayerProps {
    borderColor?: any;
    borderWidth?: any;
    color?: any;
    colorGroupingField?: any;
    colorGroups?: any;
    customize?: any;
    dataField?: any;
    dataSource?: any;
    elementType?: any;
    hoveredBorderColor?: any;
    hoveredBorderWidth?: any;
    hoveredColor?: any;
    hoverEnabled?: any;
    label?: {
        dataField?: any;
        enabled?: any;
        font?: any;
    };
    maxSize?: any;
    minSize?: any;
    name?: any;
    opacity?: any;
    palette?: any;
    paletteIndex?: any;
    paletteSize?: any;
    selectedBorderColor?: any;
    selectedBorderWidth?: any;
    selectedColor?: any;
    selectionMode?: any;
    size?: any;
    sizeGroupingField?: any;
    sizeGroups?: any;
    type?: any;
}
declare class Layer extends NestedOption<ILayerProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        label: {
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
    itemTextPosition?: any;
    margin?: {
        bottom?: any;
        left?: any;
        right?: any;
        top?: any;
    };
    markerColor?: any;
    markerShape?: any;
    markerSize?: any;
    markerTemplate?: any;
    orientation?: any;
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    rowCount?: any;
    rowItemSpacing?: any;
    source?: {
        grouping?: any;
        layer?: any;
    };
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
        legendTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        margin: {
            optionName: string;
            isCollectionItem: boolean;
        };
        source: {
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
interface IProjectionProps {
    aspectRatio?: any;
    from?: any;
    to?: any;
}
declare class Projection extends NestedOption<IProjectionProps> {
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
interface ISourceProps {
    grouping?: any;
    layer?: any;
}
declare class Source extends NestedOption<ISourceProps> {
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
interface IVectorMapTitleProps {
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
declare class VectorMapTitle extends NestedOption<IVectorMapTitleProps> {
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
        vectorMapTitleSubtitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IVectorMapTitleSubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class VectorMapTitleSubtitle extends NestedOption<IVectorMapTitleSubtitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
export default VectorMap;
export { VectorMap, IVectorMapOptions, Annotation, IAnnotationProps, AnnotationBorder, IAnnotationBorderProps, Background, IBackgroundProps, Border, IBorderProps, CommonAnnotationSettings, ICommonAnnotationSettingsProps, ControlBar, IControlBarProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Image, IImageProps, Label, ILabelProps, Layer, ILayerProps, Legend, ILegendProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, Projection, IProjectionProps, Shadow, IShadowProps, Size, ISizeProps, Source, ISourceProps, Subtitle, ISubtitleProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps, VectorMapTitle, IVectorMapTitleProps, VectorMapTitleSubtitle, IVectorMapTitleSubtitleProps };
