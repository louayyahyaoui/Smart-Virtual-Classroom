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
import dxPolarChart, { IOptions } from "devextreme/viz/polar_chart";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IPolarChartOptions extends IOptions, IHtmlOptions {
    defaultLoadingIndicator?: any;
    defaultValueAxis?: any;
    onLoadingIndicatorChange?: (value: any) => void;
    onValueAxisChange?: (value: any) => void;
}
declare class PolarChart extends BaseComponent<IPolarChartOptions> {
    get instance(): dxPolarChart;
    protected _WidgetClass: typeof dxPolarChart;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultLoadingIndicator: string;
        defaultValueAxis: string;
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
        argumentAxis: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAnnotationSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAxisSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonSeriesSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        dataPrepareSettings: {
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
        polarChartTitle: {
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
        valueAxis: {
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
    angle?: any;
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
    name?: any;
    offsetX?: any;
    offsetY?: any;
    opacity?: any;
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    radius?: any;
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
    value?: any;
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
interface IArgumentAxisProps {
    allowDecimals?: any;
    argumentType?: any;
    axisDivisionFactor?: any;
    categories?: any;
    color?: any;
    constantLines?: {
        color?: any;
        dashStyle?: any;
        displayBehindSeries?: any;
        extendAxis?: any;
        label?: {
            font?: any;
            text?: any;
            visible?: any;
        };
        value?: any;
        width?: any;
    }[];
    constantLineStyle?: {
        color?: any;
        dashStyle?: any;
        label?: {
            font?: any;
            visible?: any;
        };
        width?: any;
    };
    discreteAxisDivisionMode?: any;
    endOnTick?: any;
    firstPointOnStartAngle?: any;
    grid?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    hoverMode?: any;
    inverted?: any;
    label?: {
        customizeHint?: any;
        customizeText?: any;
        font?: any;
        format?: any;
        indentFromAxis?: any;
        overlappingBehavior?: any;
        visible?: any;
    };
    linearThreshold?: any;
    logarithmBase?: any;
    minorGrid?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    minorTick?: {
        color?: any;
        length?: any;
        opacity?: any;
        shift?: any;
        visible?: any;
        width?: any;
    };
    minorTickCount?: any;
    minorTickInterval?: {
        days?: any;
        hours?: any;
        milliseconds?: any;
        minutes?: any;
        months?: any;
        quarters?: any;
        seconds?: any;
        weeks?: any;
        years?: any;
    };
    opacity?: any;
    originValue?: any;
    period?: any;
    startAngle?: any;
    strips?: {
        color?: any;
        endValue?: any;
        label?: {
            font?: any;
            text?: any;
        };
        startValue?: any;
    }[];
    stripStyle?: {
        label?: {
            font?: any;
        };
    };
    tick?: {
        color?: any;
        length?: any;
        opacity?: any;
        shift?: any;
        visible?: any;
        width?: any;
    };
    tickInterval?: {
        days?: any;
        hours?: any;
        milliseconds?: any;
        minutes?: any;
        months?: any;
        quarters?: any;
        seconds?: any;
        weeks?: any;
        years?: any;
    };
    type?: any;
    visible?: any;
    width?: any;
}
declare class ArgumentAxis extends NestedOption<IArgumentAxisProps> {
    static OptionName: string;
    static ExpectedChildren: {
        argumentAxisMinorTick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        argumentAxisTick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        axisLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        constantLine: {
            optionName: string;
            isCollectionItem: boolean;
        };
        constantLineStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        grid: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        minorGrid: {
            optionName: string;
            isCollectionItem: boolean;
        };
        minorTick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        minorTickInterval: {
            optionName: string;
            isCollectionItem: boolean;
        };
        strip: {
            optionName: string;
            isCollectionItem: boolean;
        };
        stripStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tickInterval: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IArgumentAxisMinorTickProps {
    color?: any;
    length?: any;
    opacity?: any;
    shift?: any;
    visible?: any;
    width?: any;
}
declare class ArgumentAxisMinorTick extends NestedOption<IArgumentAxisMinorTickProps> {
    static OptionName: string;
}
interface IArgumentAxisTickProps {
    color?: any;
    length?: any;
    opacity?: any;
    shift?: any;
    visible?: any;
    width?: any;
}
declare class ArgumentAxisTick extends NestedOption<IArgumentAxisTickProps> {
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
interface IAxisLabelProps {
    customizeHint?: any;
    customizeText?: any;
    font?: any;
    format?: any;
    indentFromAxis?: any;
    overlappingBehavior?: any;
    visible?: any;
}
declare class AxisLabel extends NestedOption<IAxisLabelProps> {
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
    angle?: any;
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
    offsetX?: any;
    offsetY?: any;
    opacity?: any;
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    radius?: any;
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
    value?: any;
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
interface ICommonAxisSettingsProps {
    allowDecimals?: any;
    color?: any;
    constantLineStyle?: {
        color?: any;
        dashStyle?: any;
        label?: {
            font?: any;
            visible?: any;
        };
        width?: any;
    };
    discreteAxisDivisionMode?: any;
    endOnTick?: any;
    grid?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    inverted?: any;
    label?: {
        font?: any;
        indentFromAxis?: any;
        overlappingBehavior?: any;
        visible?: any;
    };
    minorGrid?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    minorTick?: {
        color?: any;
        length?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    opacity?: any;
    stripStyle?: {
        label?: {
            font?: any;
        };
    };
    tick?: {
        color?: any;
        length?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    visible?: any;
    width?: any;
}
declare class CommonAxisSettings extends NestedOption<ICommonAxisSettingsProps> {
    static OptionName: string;
    static ExpectedChildren: {
        commonAxisSettingsLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAxisSettingsMinorTick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAxisSettingsTick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        minorTick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tick: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ICommonAxisSettingsLabelProps {
    font?: any;
    indentFromAxis?: any;
    overlappingBehavior?: any;
    visible?: any;
}
declare class CommonAxisSettingsLabel extends NestedOption<ICommonAxisSettingsLabelProps> {
    static OptionName: string;
}
interface ICommonAxisSettingsMinorTickProps {
    color?: any;
    length?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class CommonAxisSettingsMinorTick extends NestedOption<ICommonAxisSettingsMinorTickProps> {
    static OptionName: string;
}
interface ICommonAxisSettingsTickProps {
    color?: any;
    length?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class CommonAxisSettingsTick extends NestedOption<ICommonAxisSettingsTickProps> {
    static OptionName: string;
}
interface ICommonSeriesSettingsProps {
    area?: any;
    argumentField?: any;
    axis?: any;
    bar?: any;
    barPadding?: any;
    barWidth?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    closed?: any;
    color?: any;
    dashStyle?: any;
    hoverMode?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        dashStyle?: any;
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
        width?: any;
    };
    ignoreEmptyPoints?: any;
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
        rotationAngle?: any;
        showForZeroValues?: any;
        visible?: any;
    };
    line?: any;
    maxLabelCount?: any;
    minBarSize?: any;
    opacity?: any;
    point?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        hoverMode?: any;
        hoverStyle?: {
            border?: {
                color?: any;
                visible?: any;
                width?: any;
            };
            color?: any;
            size?: any;
        };
        image?: {
            height?: any;
            url?: any;
            width?: any;
        };
        selectionMode?: any;
        selectionStyle?: {
            border?: {
                color?: any;
                visible?: any;
                width?: any;
            };
            color?: any;
            size?: any;
        };
        size?: any;
        symbol?: any;
        visible?: any;
    };
    scatter?: any;
    selectionMode?: any;
    selectionStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        dashStyle?: any;
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
        width?: any;
    };
    showInLegend?: any;
    stack?: any;
    stackedbar?: any;
    tagField?: any;
    type?: any;
    valueErrorBar?: {
        color?: any;
        displayMode?: any;
        edgeLength?: any;
        highValueField?: any;
        lineWidth?: any;
        lowValueField?: any;
        opacity?: any;
        type?: any;
        value?: any;
    };
    valueField?: any;
    visible?: any;
    width?: any;
}
declare class CommonSeriesSettings extends NestedOption<ICommonSeriesSettingsProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonSeriesSettingsHoverStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonSeriesSettingsLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonSeriesSettingsSelectionStyle: {
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
        point: {
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
        valueErrorBar: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ICommonSeriesSettingsHoverStyleProps {
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    dashStyle?: any;
    hatching?: {
        direction?: any;
        opacity?: any;
        step?: any;
        width?: any;
    };
    width?: any;
}
declare class CommonSeriesSettingsHoverStyle extends NestedOption<ICommonSeriesSettingsHoverStyleProps> {
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
interface ICommonSeriesSettingsLabelProps {
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
    rotationAngle?: any;
    showForZeroValues?: any;
    visible?: any;
}
declare class CommonSeriesSettingsLabel extends NestedOption<ICommonSeriesSettingsLabelProps> {
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
interface ICommonSeriesSettingsSelectionStyleProps {
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    dashStyle?: any;
    hatching?: {
        direction?: any;
        opacity?: any;
        step?: any;
        width?: any;
    };
    width?: any;
}
declare class CommonSeriesSettingsSelectionStyle extends NestedOption<ICommonSeriesSettingsSelectionStyleProps> {
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
interface IConnectorProps {
    color?: any;
    visible?: any;
    width?: any;
}
declare class Connector extends NestedOption<IConnectorProps> {
    static OptionName: string;
}
interface IConstantLineProps {
    color?: any;
    dashStyle?: any;
    displayBehindSeries?: any;
    extendAxis?: any;
    label?: {
        font?: any;
        text?: any;
        visible?: any;
    };
    value?: any;
    width?: any;
}
declare class ConstantLine extends NestedOption<IConstantLineProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IConstantLineLabelProps {
    font?: any;
    text?: any;
    visible?: any;
}
declare class ConstantLineLabel extends NestedOption<IConstantLineLabelProps> {
    static OptionName: string;
}
interface IConstantLineStyleProps {
    color?: any;
    dashStyle?: any;
    label?: {
        font?: any;
        visible?: any;
    };
    width?: any;
}
declare class ConstantLineStyle extends NestedOption<IConstantLineStyleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        constantLineStyleLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IConstantLineStyleLabelProps {
    font?: any;
    visible?: any;
}
declare class ConstantLineStyleLabel extends NestedOption<IConstantLineStyleLabelProps> {
    static OptionName: string;
}
interface IDataPrepareSettingsProps {
    checkTypeForAllData?: any;
    convertToAxisDataType?: any;
    sortingMethod?: any;
}
declare class DataPrepareSettings extends NestedOption<IDataPrepareSettingsProps> {
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
interface IGridProps {
    color?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class Grid extends NestedOption<IGridProps> {
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
    dashStyle?: any;
    hatching?: {
        direction?: any;
        opacity?: any;
        step?: any;
        width?: any;
    };
    width?: any;
    size?: any;
}
declare class HoverStyle extends NestedOption<IHoverStyleProps> {
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
    font?: any;
    text?: any;
    visible?: any;
    customizeHint?: any;
    customizeText?: any;
    format?: any;
    indentFromAxis?: any;
    overlappingBehavior?: any;
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
    position?: any;
    rotationAngle?: any;
    showForZeroValues?: any;
}
declare class Label extends NestedOption<ILabelProps> {
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
interface ILengthProps {
    days?: any;
    hours?: any;
    milliseconds?: any;
    minutes?: any;
    months?: any;
    quarters?: any;
    seconds?: any;
    weeks?: any;
    years?: any;
}
declare class Length extends NestedOption<ILengthProps> {
    static OptionName: string;
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
interface IMinorGridProps {
    color?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class MinorGrid extends NestedOption<IMinorGridProps> {
    static OptionName: string;
}
interface IMinorTickProps {
    color?: any;
    length?: any;
    opacity?: any;
    shift?: any;
    visible?: any;
    width?: any;
}
declare class MinorTick extends NestedOption<IMinorTickProps> {
    static OptionName: string;
}
interface IMinorTickIntervalProps {
    days?: any;
    hours?: any;
    milliseconds?: any;
    minutes?: any;
    months?: any;
    quarters?: any;
    seconds?: any;
    weeks?: any;
    years?: any;
}
declare class MinorTickInterval extends NestedOption<IMinorTickIntervalProps> {
    static OptionName: string;
}
interface IMinVisualRangeLengthProps {
    days?: any;
    hours?: any;
    milliseconds?: any;
    minutes?: any;
    months?: any;
    quarters?: any;
    seconds?: any;
    weeks?: any;
    years?: any;
}
declare class MinVisualRangeLength extends NestedOption<IMinVisualRangeLengthProps> {
    static OptionName: string;
}
interface IPointProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    hoverMode?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        size?: any;
    };
    image?: {
        height?: any;
        url?: any;
        width?: any;
    };
    selectionMode?: any;
    selectionStyle?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        size?: any;
    };
    size?: any;
    symbol?: any;
    visible?: any;
}
declare class Point extends NestedOption<IPointProps> {
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
        image: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pointBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pointHoverStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pointSelectionStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        selectionStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPointBorderProps {
    color?: any;
    visible?: any;
    width?: any;
}
declare class PointBorder extends NestedOption<IPointBorderProps> {
    static OptionName: string;
}
interface IPointHoverStyleProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    size?: any;
}
declare class PointHoverStyle extends NestedOption<IPointHoverStyleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pointBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPointSelectionStyleProps {
    border?: {
        color?: any;
        visible?: any;
        width?: any;
    };
    color?: any;
    size?: any;
}
declare class PointSelectionStyle extends NestedOption<IPointSelectionStyleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pointBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPolarChartTitleProps {
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
declare class PolarChartTitle extends NestedOption<IPolarChartTitleProps> {
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
        polarChartTitleSubtitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        subtitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPolarChartTitleSubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class PolarChartTitleSubtitle extends NestedOption<IPolarChartTitleSubtitleProps> {
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
        visible?: any;
        width?: any;
    };
    color?: any;
    size?: any;
    dashStyle?: any;
    hatching?: {
        direction?: any;
        opacity?: any;
        step?: any;
        width?: any;
    };
    width?: any;
}
declare class SelectionStyle extends NestedOption<ISelectionStyleProps> {
    static OptionName: string;
}
interface ISeriesProps {
    argumentField?: any;
    axis?: any;
    barPadding?: any;
    barWidth?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    closed?: any;
    color?: any;
    dashStyle?: any;
    hoverMode?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        dashStyle?: any;
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
        width?: any;
    };
    ignoreEmptyPoints?: any;
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
        rotationAngle?: any;
        showForZeroValues?: any;
        visible?: any;
    };
    maxLabelCount?: any;
    minBarSize?: any;
    name?: any;
    opacity?: any;
    point?: {
        border?: {
            color?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        hoverMode?: any;
        hoverStyle?: {
            border?: {
                color?: any;
                visible?: any;
                width?: any;
            };
            color?: any;
            size?: any;
        };
        image?: {
            height?: any;
            url?: any;
            width?: any;
        };
        selectionMode?: any;
        selectionStyle?: {
            border?: {
                color?: any;
                visible?: any;
                width?: any;
            };
            color?: any;
            size?: any;
        };
        size?: any;
        symbol?: any;
        visible?: any;
    };
    selectionMode?: any;
    selectionStyle?: {
        border?: {
            color?: any;
            dashStyle?: any;
            visible?: any;
            width?: any;
        };
        color?: any;
        dashStyle?: any;
        hatching?: {
            direction?: any;
            opacity?: any;
            step?: any;
            width?: any;
        };
        width?: any;
    };
    showInLegend?: any;
    stack?: any;
    tag?: any;
    tagField?: any;
    type?: any;
    valueErrorBar?: {
        color?: any;
        displayMode?: any;
        edgeLength?: any;
        highValueField?: any;
        lineWidth?: any;
        lowValueField?: any;
        opacity?: any;
        type?: any;
        value?: any;
    };
    valueField?: any;
    visible?: any;
    width?: any;
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
interface IStripProps {
    color?: any;
    endValue?: any;
    label?: {
        font?: any;
        text?: any;
    };
    startValue?: any;
}
declare class Strip extends NestedOption<IStripProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IStripLabelProps {
    font?: any;
    text?: any;
}
declare class StripLabel extends NestedOption<IStripLabelProps> {
    static OptionName: string;
}
interface IStripStyleProps {
    label?: {
        font?: any;
    };
}
declare class StripStyle extends NestedOption<IStripStyleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        stripStyleLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IStripStyleLabelProps {
    font?: any;
}
declare class StripStyleLabel extends NestedOption<IStripStyleLabelProps> {
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
interface ITickProps {
    color?: any;
    length?: any;
    opacity?: any;
    shift?: any;
    visible?: any;
    width?: any;
}
declare class Tick extends NestedOption<ITickProps> {
    static OptionName: string;
}
interface ITickIntervalProps {
    days?: any;
    hours?: any;
    milliseconds?: any;
    minutes?: any;
    months?: any;
    quarters?: any;
    seconds?: any;
    weeks?: any;
    years?: any;
}
declare class TickInterval extends NestedOption<ITickIntervalProps> {
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
interface IValueAxisProps {
    allowDecimals?: any;
    axisDivisionFactor?: any;
    categories?: any;
    color?: any;
    constantLines?: {
        color?: any;
        dashStyle?: any;
        displayBehindSeries?: any;
        extendAxis?: any;
        label?: {
            font?: any;
            text?: any;
            visible?: any;
        };
        value?: any;
        width?: any;
    }[];
    constantLineStyle?: {
        color?: any;
        dashStyle?: any;
        label?: {
            font?: any;
            visible?: any;
        };
        width?: any;
    };
    discreteAxisDivisionMode?: any;
    endOnTick?: any;
    grid?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    inverted?: any;
    label?: {
        customizeHint?: any;
        customizeText?: any;
        font?: any;
        format?: any;
        indentFromAxis?: any;
        overlappingBehavior?: any;
        visible?: any;
    };
    linearThreshold?: any;
    logarithmBase?: any;
    maxValueMargin?: any;
    minorGrid?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    minorTick?: {
        color?: any;
        length?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    minorTickCount?: any;
    minorTickInterval?: {
        days?: any;
        hours?: any;
        milliseconds?: any;
        minutes?: any;
        months?: any;
        quarters?: any;
        seconds?: any;
        weeks?: any;
        years?: any;
    };
    minValueMargin?: any;
    minVisualRangeLength?: {
        days?: any;
        hours?: any;
        milliseconds?: any;
        minutes?: any;
        months?: any;
        quarters?: any;
        seconds?: any;
        weeks?: any;
        years?: any;
    };
    opacity?: any;
    showZero?: any;
    strips?: {
        color?: any;
        endValue?: any;
        label?: {
            font?: any;
            text?: any;
        };
        startValue?: any;
    }[];
    stripStyle?: {
        label?: {
            font?: any;
        };
    };
    tick?: {
        color?: any;
        length?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    tickInterval?: {
        days?: any;
        hours?: any;
        milliseconds?: any;
        minutes?: any;
        months?: any;
        quarters?: any;
        seconds?: any;
        weeks?: any;
        years?: any;
    };
    type?: any;
    valueMarginsEnabled?: any;
    valueType?: any;
    visible?: any;
    visualRange?: any;
    visualRangeUpdateMode?: any;
    wholeRange?: any;
    width?: any;
    defaultVisualRange?: any;
    onVisualRangeChange?: (value: any) => void;
}
declare class ValueAxis extends NestedOption<IValueAxisProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultVisualRange: string;
    };
    static ExpectedChildren: {
        axisLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAxisSettingsTick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        constantLine: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        minorTickInterval: {
            optionName: string;
            isCollectionItem: boolean;
        };
        minVisualRangeLength: {
            optionName: string;
            isCollectionItem: boolean;
        };
        strip: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tick: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tickInterval: {
            optionName: string;
            isCollectionItem: boolean;
        };
        visualRange: {
            optionName: string;
            isCollectionItem: boolean;
        };
        wholeRange: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IValueErrorBarProps {
    color?: any;
    displayMode?: any;
    edgeLength?: any;
    highValueField?: any;
    lineWidth?: any;
    lowValueField?: any;
    opacity?: any;
    type?: any;
    value?: any;
}
declare class ValueErrorBar extends NestedOption<IValueErrorBarProps> {
    static OptionName: string;
}
interface IVisualRangeProps {
    endValue?: any;
    length?: {
        days?: any;
        hours?: any;
        milliseconds?: any;
        minutes?: any;
        months?: any;
        quarters?: any;
        seconds?: any;
        weeks?: any;
        years?: any;
    };
    startValue?: any;
    defaultEndValue?: any;
    onEndValueChange?: (value: any) => void;
    defaultStartValue?: any;
    onStartValueChange?: (value: any) => void;
}
declare class VisualRange extends NestedOption<IVisualRangeProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultEndValue: string;
        defaultStartValue: string;
    };
    static ExpectedChildren: {
        length: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IWholeRangeProps {
    endValue?: any;
    length?: {
        days?: any;
        hours?: any;
        milliseconds?: any;
        minutes?: any;
        months?: any;
        quarters?: any;
        seconds?: any;
        weeks?: any;
        years?: any;
    };
    startValue?: any;
    defaultEndValue?: any;
    onEndValueChange?: (value: any) => void;
    defaultStartValue?: any;
    onStartValueChange?: (value: any) => void;
}
declare class WholeRange extends NestedOption<IWholeRangeProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultEndValue: string;
        defaultStartValue: string;
    };
}
export default PolarChart;
export { PolarChart, IPolarChartOptions, AdaptiveLayout, IAdaptiveLayoutProps, Animation, IAnimationProps, Annotation, IAnnotationProps, AnnotationBorder, IAnnotationBorderProps, ArgumentAxis, IArgumentAxisProps, ArgumentAxisMinorTick, IArgumentAxisMinorTickProps, ArgumentAxisTick, IArgumentAxisTickProps, ArgumentFormat, IArgumentFormatProps, AxisLabel, IAxisLabelProps, Border, IBorderProps, CommonAnnotationSettings, ICommonAnnotationSettingsProps, CommonAxisSettings, ICommonAxisSettingsProps, CommonAxisSettingsLabel, ICommonAxisSettingsLabelProps, CommonAxisSettingsMinorTick, ICommonAxisSettingsMinorTickProps, CommonAxisSettingsTick, ICommonAxisSettingsTickProps, CommonSeriesSettings, ICommonSeriesSettingsProps, CommonSeriesSettingsHoverStyle, ICommonSeriesSettingsHoverStyleProps, CommonSeriesSettingsLabel, ICommonSeriesSettingsLabelProps, CommonSeriesSettingsSelectionStyle, ICommonSeriesSettingsSelectionStyleProps, Connector, IConnectorProps, ConstantLine, IConstantLineProps, ConstantLineLabel, IConstantLineLabelProps, ConstantLineStyle, IConstantLineStyleProps, ConstantLineStyleLabel, IConstantLineStyleLabelProps, DataPrepareSettings, IDataPrepareSettingsProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Grid, IGridProps, Hatching, IHatchingProps, HoverStyle, IHoverStyleProps, Image, IImageProps, Label, ILabelProps, Legend, ILegendProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, Length, ILengthProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, MinorGrid, IMinorGridProps, MinorTick, IMinorTickProps, MinorTickInterval, IMinorTickIntervalProps, MinVisualRangeLength, IMinVisualRangeLengthProps, Point, IPointProps, PointBorder, IPointBorderProps, PointHoverStyle, IPointHoverStyleProps, PointSelectionStyle, IPointSelectionStyleProps, PolarChartTitle, IPolarChartTitleProps, PolarChartTitleSubtitle, IPolarChartTitleSubtitleProps, SelectionStyle, ISelectionStyleProps, Series, ISeriesProps, SeriesBorder, ISeriesBorderProps, SeriesTemplate, ISeriesTemplateProps, Shadow, IShadowProps, Size, ISizeProps, Strip, IStripProps, StripLabel, IStripLabelProps, StripStyle, IStripStyleProps, StripStyleLabel, IStripStyleLabelProps, Subtitle, ISubtitleProps, Tick, ITickProps, TickInterval, ITickIntervalProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps, ValueAxis, IValueAxisProps, ValueErrorBar, IValueErrorBarProps, VisualRange, IVisualRangeProps, WholeRange, IWholeRangeProps };
