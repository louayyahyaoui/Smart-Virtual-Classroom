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
import dxChart, { IOptions } from "devextreme/viz/chart";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IChartOptions extends IOptions, IHtmlOptions {
    defaultArgumentAxis?: any;
    defaultLoadingIndicator?: any;
    defaultValueAxis?: any;
    onArgumentAxisChange?: (value: any) => void;
    onLoadingIndicatorChange?: (value: any) => void;
    onValueAxisChange?: (value: any) => void;
}
declare class Chart extends BaseComponent<IChartOptions> {
    get instance(): dxChart;
    protected _WidgetClass: typeof dxChart;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultArgumentAxis: string;
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
        chartTitle: {
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
        commonPaneSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonSeriesSettings: {
            optionName: string;
            isCollectionItem: boolean;
        };
        crosshair: {
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
        pane: {
            optionName: string;
            isCollectionItem: boolean;
        };
        scrollBar: {
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
        zoomAndPan: {
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
interface IAggregationProps {
    calculate?: any;
    enabled?: any;
    method?: any;
}
declare class Aggregation extends NestedOption<IAggregationProps> {
    static OptionName: string;
}
interface IAggregationIntervalProps {
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
declare class AggregationInterval extends NestedOption<IAggregationIntervalProps> {
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
    axis?: any;
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
        annotationImage: {
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
interface IAnnotationImageProps {
    height?: any;
    url?: any;
    width?: any;
}
declare class AnnotationImage extends NestedOption<IAnnotationImageProps> {
    static OptionName: string;
}
interface IArgumentAxisProps {
    aggregateByCategory?: any;
    aggregationGroupWidth?: any;
    aggregationInterval?: {
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
    allowDecimals?: any;
    argumentType?: any;
    axisDivisionFactor?: any;
    breaks?: {
        endValue?: any;
        startValue?: any;
    }[];
    breakStyle?: {
        color?: any;
        line?: any;
        width?: any;
    };
    categories?: any;
    color?: any;
    constantLines?: {
        color?: any;
        dashStyle?: any;
        displayBehindSeries?: any;
        extendAxis?: any;
        label?: {
            font?: any;
            horizontalAlignment?: any;
            position?: any;
            text?: any;
            verticalAlignment?: any;
            visible?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
        value?: any;
        width?: any;
    }[];
    constantLineStyle?: {
        color?: any;
        dashStyle?: any;
        label?: {
            font?: any;
            horizontalAlignment?: any;
            position?: any;
            verticalAlignment?: any;
            visible?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
        width?: any;
    };
    customPosition?: any;
    customPositionAxis?: any;
    discreteAxisDivisionMode?: any;
    endOnTick?: any;
    grid?: {
        color?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    holidays?: any;
    hoverMode?: any;
    inverted?: any;
    label?: {
        alignment?: any;
        customizeHint?: any;
        customizeText?: any;
        displayMode?: any;
        font?: any;
        format?: any;
        indentFromAxis?: any;
        overlappingBehavior?: any;
        position?: any;
        rotationAngle?: any;
        staggeringSpacing?: any;
        template?: any;
        textOverflow?: any;
        visible?: any;
        wordWrap?: any;
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
    offset?: any;
    opacity?: any;
    placeholderSize?: any;
    position?: any;
    singleWorkdays?: any;
    strips?: {
        color?: any;
        endValue?: any;
        label?: {
            font?: any;
            horizontalAlignment?: any;
            text?: any;
            verticalAlignment?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
        startValue?: any;
    }[];
    stripStyle?: {
        label?: {
            font?: any;
            horizontalAlignment?: any;
            verticalAlignment?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
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
    title?: {
        alignment?: any;
        font?: any;
        margin?: any;
        text?: any;
        textOverflow?: any;
        wordWrap?: any;
    };
    type?: any;
    valueMarginsEnabled?: any;
    visible?: any;
    visualRange?: any;
    visualRangeUpdateMode?: any;
    wholeRange?: any;
    width?: any;
    workdaysOnly?: any;
    workWeek?: any;
    defaultVisualRange?: any;
    onVisualRangeChange?: (value: any) => void;
}
declare class ArgumentAxis extends NestedOption<IArgumentAxisProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultVisualRange: string;
    };
    static ExpectedChildren: {
        aggregationInterval: {
            optionName: string;
            isCollectionItem: boolean;
        };
        axisConstantLineStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        axisLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        axisTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        break: {
            optionName: string;
            isCollectionItem: boolean;
        };
        breakStyle: {
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
        minVisualRangeLength: {
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
        title: {
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
interface IAxisConstantLineStyleProps {
    color?: any;
    dashStyle?: any;
    label?: {
        font?: any;
        horizontalAlignment?: any;
        position?: any;
        verticalAlignment?: any;
        visible?: any;
    };
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    width?: any;
}
declare class AxisConstantLineStyle extends NestedOption<IAxisConstantLineStyleProps> {
    static OptionName: string;
}
interface IAxisConstantLineStyleLabelProps {
    font?: any;
    horizontalAlignment?: any;
    position?: any;
    verticalAlignment?: any;
    visible?: any;
}
declare class AxisConstantLineStyleLabel extends NestedOption<IAxisConstantLineStyleLabelProps> {
    static OptionName: string;
}
interface IAxisLabelProps {
    alignment?: any;
    customizeHint?: any;
    customizeText?: any;
    displayMode?: any;
    font?: any;
    format?: any;
    indentFromAxis?: any;
    overlappingBehavior?: any;
    position?: any;
    rotationAngle?: any;
    staggeringSpacing?: any;
    template?: any;
    textOverflow?: any;
    visible?: any;
    wordWrap?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class AxisLabel extends NestedOption<IAxisLabelProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IAxisTitleProps {
    alignment?: any;
    font?: any;
    margin?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class AxisTitle extends NestedOption<IAxisTitleProps> {
    static OptionName: string;
}
interface IBorderProps {
    color?: any;
    cornerRadius?: any;
    dashStyle?: any;
    opacity?: any;
    visible?: any;
    width?: any;
    bottom?: any;
    left?: any;
    right?: any;
    top?: any;
}
declare class Border extends NestedOption<IBorderProps> {
    static OptionName: string;
}
interface IBreakProps {
    endValue?: any;
    startValue?: any;
}
declare class Break extends NestedOption<IBreakProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IBreakStyleProps {
    color?: any;
    line?: any;
    width?: any;
}
declare class BreakStyle extends NestedOption<IBreakStyleProps> {
    static OptionName: string;
}
interface IChartTitleProps {
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
declare class ChartTitle extends NestedOption<IChartTitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        chartTitleSubtitle: {
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
interface IChartTitleSubtitleProps {
    font?: any;
    offset?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class ChartTitleSubtitle extends NestedOption<IChartTitleSubtitleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ICommonAnnotationSettingsProps {
    allowDragging?: any;
    argument?: any;
    arrowLength?: any;
    arrowWidth?: any;
    axis?: any;
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
    breakStyle?: {
        color?: any;
        line?: any;
        width?: any;
    };
    color?: any;
    constantLineStyle?: {
        color?: any;
        dashStyle?: any;
        label?: {
            font?: any;
            position?: any;
            visible?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
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
        alignment?: any;
        displayMode?: any;
        font?: any;
        indentFromAxis?: any;
        overlappingBehavior?: any;
        position?: any;
        rotationAngle?: any;
        staggeringSpacing?: any;
        template?: any;
        textOverflow?: any;
        visible?: any;
        wordWrap?: any;
    };
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
        shift?: any;
        visible?: any;
        width?: any;
    };
    minValueMargin?: any;
    opacity?: any;
    placeholderSize?: any;
    stripStyle?: {
        label?: {
            font?: any;
            horizontalAlignment?: any;
            verticalAlignment?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
    };
    tick?: {
        color?: any;
        length?: any;
        opacity?: any;
        shift?: any;
        visible?: any;
        width?: any;
    };
    title?: {
        alignment?: any;
        font?: any;
        margin?: any;
        textOverflow?: any;
        wordWrap?: any;
    };
    valueMarginsEnabled?: any;
    visible?: any;
    width?: any;
}
declare class CommonAxisSettings extends NestedOption<ICommonAxisSettingsProps> {
    static OptionName: string;
    static ExpectedChildren: {
        commonAxisSettingsConstantLineStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAxisSettingsLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        commonAxisSettingsTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        constantLineStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        title: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ICommonAxisSettingsConstantLineStyleProps {
    color?: any;
    dashStyle?: any;
    label?: {
        font?: any;
        position?: any;
        visible?: any;
    };
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    width?: any;
}
declare class CommonAxisSettingsConstantLineStyle extends NestedOption<ICommonAxisSettingsConstantLineStyleProps> {
    static OptionName: string;
    static ExpectedChildren: {
        commonAxisSettingsConstantLineStyleLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ICommonAxisSettingsConstantLineStyleLabelProps {
    font?: any;
    position?: any;
    visible?: any;
}
declare class CommonAxisSettingsConstantLineStyleLabel extends NestedOption<ICommonAxisSettingsConstantLineStyleLabelProps> {
    static OptionName: string;
}
interface ICommonAxisSettingsLabelProps {
    alignment?: any;
    displayMode?: any;
    font?: any;
    indentFromAxis?: any;
    overlappingBehavior?: any;
    position?: any;
    rotationAngle?: any;
    staggeringSpacing?: any;
    template?: any;
    textOverflow?: any;
    visible?: any;
    wordWrap?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class CommonAxisSettingsLabel extends NestedOption<ICommonAxisSettingsLabelProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface ICommonAxisSettingsTitleProps {
    alignment?: any;
    font?: any;
    margin?: any;
    textOverflow?: any;
    wordWrap?: any;
}
declare class CommonAxisSettingsTitle extends NestedOption<ICommonAxisSettingsTitleProps> {
    static OptionName: string;
}
interface ICommonPaneSettingsProps {
    backgroundColor?: any;
    border?: {
        bottom?: any;
        color?: any;
        dashStyle?: any;
        left?: any;
        opacity?: any;
        right?: any;
        top?: any;
        visible?: any;
        width?: any;
    };
}
declare class CommonPaneSettings extends NestedOption<ICommonPaneSettingsProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        paneBorder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ICommonSeriesSettingsProps {
    aggregation?: {
        calculate?: any;
        enabled?: any;
        method?: any;
    };
    area?: any;
    argumentField?: any;
    axis?: any;
    bar?: any;
    barOverlapGroup?: any;
    barPadding?: any;
    barWidth?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    bubble?: any;
    candlestick?: any;
    closeValueField?: any;
    color?: any;
    cornerRadius?: any;
    dashStyle?: any;
    fullstackedarea?: any;
    fullstackedbar?: any;
    fullstackedline?: any;
    fullstackedspline?: any;
    fullstackedsplinearea?: any;
    highValueField?: any;
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
    innerColor?: any;
    label?: {
        alignment?: any;
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
        horizontalOffset?: any;
        position?: any;
        rotationAngle?: any;
        showForZeroValues?: any;
        verticalOffset?: any;
        visible?: any;
    };
    line?: any;
    lowValueField?: any;
    maxLabelCount?: any;
    minBarSize?: any;
    opacity?: any;
    openValueField?: any;
    pane?: any;
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
            height?: {
                rangeMaxPoint?: any;
                rangeMinPoint?: any;
            };
            url?: {
                rangeMaxPoint?: any;
                rangeMinPoint?: any;
            };
            width?: {
                rangeMaxPoint?: any;
                rangeMinPoint?: any;
            };
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
    rangearea?: any;
    rangebar?: any;
    rangeValue1Field?: any;
    rangeValue2Field?: any;
    reduction?: {
        color?: any;
        level?: any;
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
    sizeField?: any;
    spline?: any;
    splinearea?: any;
    stack?: any;
    stackedarea?: any;
    stackedbar?: any;
    stackedline?: any;
    stackedspline?: any;
    stackedsplinearea?: any;
    steparea?: any;
    stepline?: any;
    stock?: any;
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
        aggregation: {
            optionName: string;
            isCollectionItem: boolean;
        };
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
        reduction: {
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
    alignment?: any;
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
    horizontalOffset?: any;
    position?: any;
    rotationAngle?: any;
    showForZeroValues?: any;
    verticalOffset?: any;
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
        horizontalAlignment?: any;
        position?: any;
        text?: any;
        verticalAlignment?: any;
        visible?: any;
    };
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    value?: any;
    width?: any;
}
declare class ConstantLine extends NestedOption<IConstantLineProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IConstantLineLabelProps {
    font?: any;
    horizontalAlignment?: any;
    position?: any;
    text?: any;
    verticalAlignment?: any;
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
        horizontalAlignment?: any;
        position?: any;
        verticalAlignment?: any;
        visible?: any;
    };
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    width?: any;
}
declare class ConstantLineStyle extends NestedOption<IConstantLineStyleProps> {
    static OptionName: string;
}
interface ICrosshairProps {
    color?: any;
    dashStyle?: any;
    enabled?: any;
    horizontalLine?: {
        color?: any;
        dashStyle?: any;
        label?: {
            backgroundColor?: any;
            customizeText?: any;
            font?: any;
            format?: any;
            visible?: any;
        };
        opacity?: any;
        visible?: any;
        width?: any;
    };
    label?: {
        backgroundColor?: any;
        customizeText?: any;
        font?: any;
        format?: any;
        visible?: any;
    };
    opacity?: any;
    verticalLine?: {
        color?: any;
        dashStyle?: any;
        label?: {
            backgroundColor?: any;
            customizeText?: any;
            font?: any;
            format?: any;
            visible?: any;
        };
        opacity?: any;
        visible?: any;
        width?: any;
    };
    width?: any;
}
declare class Crosshair extends NestedOption<ICrosshairProps> {
    static OptionName: string;
    static ExpectedChildren: {
        horizontalLine: {
            optionName: string;
            isCollectionItem: boolean;
        };
        horizontalLineLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        verticalLine: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IDataPrepareSettingsProps {
    checkTypeForAllData?: any;
    convertToAxisDataType?: any;
    sortingMethod?: any;
}
declare class DataPrepareSettings extends NestedOption<IDataPrepareSettingsProps> {
    static OptionName: string;
}
interface IDragBoxStyleProps {
    color?: any;
    opacity?: any;
}
declare class DragBoxStyle extends NestedOption<IDragBoxStyleProps> {
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
interface IHeightProps {
    rangeMaxPoint?: any;
    rangeMinPoint?: any;
}
declare class Height extends NestedOption<IHeightProps> {
    static OptionName: string;
}
interface IHorizontalLineProps {
    color?: any;
    dashStyle?: any;
    label?: {
        backgroundColor?: any;
        customizeText?: any;
        font?: any;
        format?: any;
        visible?: any;
    };
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class HorizontalLine extends NestedOption<IHorizontalLineProps> {
    static OptionName: string;
    static ExpectedChildren: {
        horizontalLineLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IHorizontalLineLabelProps {
    backgroundColor?: any;
    customizeText?: any;
    font?: any;
    format?: any;
    visible?: any;
}
declare class HorizontalLineLabel extends NestedOption<IHorizontalLineLabelProps> {
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
    horizontalAlignment?: any;
    position?: any;
    verticalAlignment?: any;
    visible?: any;
    text?: any;
    alignment?: any;
    customizeHint?: any;
    customizeText?: any;
    displayMode?: any;
    format?: any;
    indentFromAxis?: any;
    overlappingBehavior?: any;
    rotationAngle?: any;
    staggeringSpacing?: any;
    template?: any;
    textOverflow?: any;
    wordWrap?: any;
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
    horizontalOffset?: any;
    showForZeroValues?: any;
    verticalOffset?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Label extends NestedOption<ILabelProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
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
    position?: any;
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
interface IPaneProps {
    backgroundColor?: any;
    border?: {
        bottom?: any;
        color?: any;
        dashStyle?: any;
        left?: any;
        opacity?: any;
        right?: any;
        top?: any;
        visible?: any;
        width?: any;
    };
    height?: any;
    name?: any;
}
declare class Pane extends NestedOption<IPaneProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IPaneBorderProps {
    bottom?: any;
    color?: any;
    dashStyle?: any;
    left?: any;
    opacity?: any;
    right?: any;
    top?: any;
    visible?: any;
    width?: any;
}
declare class PaneBorder extends NestedOption<IPaneBorderProps> {
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
        height?: {
            rangeMaxPoint?: any;
            rangeMinPoint?: any;
        };
        url?: {
            rangeMaxPoint?: any;
            rangeMinPoint?: any;
        };
        width?: {
            rangeMaxPoint?: any;
            rangeMinPoint?: any;
        };
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
        pointImage: {
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
interface IPointImageProps {
    height?: {
        rangeMaxPoint?: any;
        rangeMinPoint?: any;
    };
    url?: {
        rangeMaxPoint?: any;
        rangeMinPoint?: any;
    };
    width?: {
        rangeMaxPoint?: any;
        rangeMinPoint?: any;
    };
}
declare class PointImage extends NestedOption<IPointImageProps> {
    static OptionName: string;
    static ExpectedChildren: {
        height: {
            optionName: string;
            isCollectionItem: boolean;
        };
        url: {
            optionName: string;
            isCollectionItem: boolean;
        };
        width: {
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
interface IReductionProps {
    color?: any;
    level?: any;
}
declare class Reduction extends NestedOption<IReductionProps> {
    static OptionName: string;
}
interface IScrollBarProps {
    color?: any;
    offset?: any;
    opacity?: any;
    position?: any;
    visible?: any;
    width?: any;
}
declare class ScrollBar extends NestedOption<IScrollBarProps> {
    static OptionName: string;
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
    aggregation?: {
        calculate?: any;
        enabled?: any;
        method?: any;
    };
    argumentField?: any;
    axis?: any;
    barOverlapGroup?: any;
    barPadding?: any;
    barWidth?: any;
    border?: {
        color?: any;
        dashStyle?: any;
        visible?: any;
        width?: any;
    };
    closeValueField?: any;
    color?: any;
    cornerRadius?: any;
    dashStyle?: any;
    highValueField?: any;
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
    innerColor?: any;
    label?: {
        alignment?: any;
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
        horizontalOffset?: any;
        position?: any;
        rotationAngle?: any;
        showForZeroValues?: any;
        verticalOffset?: any;
        visible?: any;
    };
    lowValueField?: any;
    maxLabelCount?: any;
    minBarSize?: any;
    name?: any;
    opacity?: any;
    openValueField?: any;
    pane?: any;
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
            height?: {
                rangeMaxPoint?: any;
                rangeMinPoint?: any;
            };
            url?: {
                rangeMaxPoint?: any;
                rangeMinPoint?: any;
            };
            width?: {
                rangeMaxPoint?: any;
                rangeMinPoint?: any;
            };
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
    rangeValue1Field?: any;
    rangeValue2Field?: any;
    reduction?: {
        color?: any;
        level?: any;
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
    sizeField?: any;
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
        horizontalAlignment?: any;
        text?: any;
        verticalAlignment?: any;
    };
    paddingLeftRight?: any;
    paddingTopBottom?: any;
    startValue?: any;
}
declare class Strip extends NestedOption<IStripProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IStripLabelProps {
    font?: any;
    horizontalAlignment?: any;
    text?: any;
    verticalAlignment?: any;
}
declare class StripLabel extends NestedOption<IStripLabelProps> {
    static OptionName: string;
}
interface IStripStyleProps {
    label?: {
        font?: any;
        horizontalAlignment?: any;
        verticalAlignment?: any;
    };
    paddingLeftRight?: any;
    paddingTopBottom?: any;
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
    horizontalAlignment?: any;
    verticalAlignment?: any;
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
    alignment?: any;
    font?: any;
    margin?: any;
    text?: any;
    textOverflow?: any;
    wordWrap?: any;
    horizontalAlignment?: any;
    placeholderSize?: any;
    subtitle?: {
        font?: any;
        offset?: any;
        text?: any;
    };
    verticalAlignment?: any;
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
    location?: any;
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
interface IUrlProps {
    rangeMaxPoint?: any;
    rangeMinPoint?: any;
}
declare class Url extends NestedOption<IUrlProps> {
    static OptionName: string;
}
interface IValueAxisProps {
    allowDecimals?: any;
    autoBreaksEnabled?: any;
    axisDivisionFactor?: any;
    breaks?: {
        endValue?: any;
        startValue?: any;
    }[];
    breakStyle?: {
        color?: any;
        line?: any;
        width?: any;
    };
    categories?: any;
    color?: any;
    constantLines?: {
        color?: any;
        dashStyle?: any;
        displayBehindSeries?: any;
        extendAxis?: any;
        label?: {
            font?: any;
            horizontalAlignment?: any;
            position?: any;
            text?: any;
            verticalAlignment?: any;
            visible?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
        value?: any;
        width?: any;
    }[];
    constantLineStyle?: {
        color?: any;
        dashStyle?: any;
        label?: {
            font?: any;
            horizontalAlignment?: any;
            position?: any;
            verticalAlignment?: any;
            visible?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
        width?: any;
    };
    customPosition?: any;
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
        alignment?: any;
        customizeHint?: any;
        customizeText?: any;
        displayMode?: any;
        font?: any;
        format?: any;
        indentFromAxis?: any;
        overlappingBehavior?: any;
        position?: any;
        rotationAngle?: any;
        staggeringSpacing?: any;
        template?: any;
        textOverflow?: any;
        visible?: any;
        wordWrap?: any;
    };
    linearThreshold?: any;
    logarithmBase?: any;
    maxAutoBreakCount?: any;
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
    multipleAxesSpacing?: any;
    name?: any;
    offset?: any;
    opacity?: any;
    pane?: any;
    placeholderSize?: any;
    position?: any;
    showZero?: any;
    strips?: {
        color?: any;
        endValue?: any;
        label?: {
            font?: any;
            horizontalAlignment?: any;
            text?: any;
            verticalAlignment?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
        startValue?: any;
    }[];
    stripStyle?: {
        label?: {
            font?: any;
            horizontalAlignment?: any;
            verticalAlignment?: any;
        };
        paddingLeftRight?: any;
        paddingTopBottom?: any;
    };
    synchronizedValue?: any;
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
    title?: {
        alignment?: any;
        font?: any;
        margin?: any;
        text?: any;
        textOverflow?: any;
        wordWrap?: any;
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
    static IsCollectionItem: boolean;
    static DefaultsProps: {
        defaultVisualRange: string;
    };
    static ExpectedChildren: {
        axisConstantLineStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        axisLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        axisTitle: {
            optionName: string;
            isCollectionItem: boolean;
        };
        break: {
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
        tickInterval: {
            optionName: string;
            isCollectionItem: boolean;
        };
        title: {
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
interface IVerticalLineProps {
    color?: any;
    dashStyle?: any;
    label?: {
        backgroundColor?: any;
        customizeText?: any;
        font?: any;
        format?: any;
        visible?: any;
    };
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class VerticalLine extends NestedOption<IVerticalLineProps> {
    static OptionName: string;
    static ExpectedChildren: {
        horizontalLineLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
interface IWidthProps {
    rangeMaxPoint?: any;
    rangeMinPoint?: any;
}
declare class Width extends NestedOption<IWidthProps> {
    static OptionName: string;
}
interface IZoomAndPanProps {
    allowMouseWheel?: any;
    allowTouchGestures?: any;
    argumentAxis?: any;
    dragBoxStyle?: {
        color?: any;
        opacity?: any;
    };
    dragToZoom?: any;
    panKey?: any;
    valueAxis?: any;
}
declare class ZoomAndPan extends NestedOption<IZoomAndPanProps> {
    static OptionName: string;
    static ExpectedChildren: {
        dragBoxStyle: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
export default Chart;
export { Chart, IChartOptions, AdaptiveLayout, IAdaptiveLayoutProps, Aggregation, IAggregationProps, AggregationInterval, IAggregationIntervalProps, Animation, IAnimationProps, Annotation, IAnnotationProps, AnnotationBorder, IAnnotationBorderProps, AnnotationImage, IAnnotationImageProps, ArgumentAxis, IArgumentAxisProps, ArgumentFormat, IArgumentFormatProps, AxisConstantLineStyle, IAxisConstantLineStyleProps, AxisConstantLineStyleLabel, IAxisConstantLineStyleLabelProps, AxisLabel, IAxisLabelProps, AxisTitle, IAxisTitleProps, Border, IBorderProps, Break, IBreakProps, BreakStyle, IBreakStyleProps, ChartTitle, IChartTitleProps, ChartTitleSubtitle, IChartTitleSubtitleProps, CommonAnnotationSettings, ICommonAnnotationSettingsProps, CommonAxisSettings, ICommonAxisSettingsProps, CommonAxisSettingsConstantLineStyle, ICommonAxisSettingsConstantLineStyleProps, CommonAxisSettingsConstantLineStyleLabel, ICommonAxisSettingsConstantLineStyleLabelProps, CommonAxisSettingsLabel, ICommonAxisSettingsLabelProps, CommonAxisSettingsTitle, ICommonAxisSettingsTitleProps, CommonPaneSettings, ICommonPaneSettingsProps, CommonSeriesSettings, ICommonSeriesSettingsProps, CommonSeriesSettingsHoverStyle, ICommonSeriesSettingsHoverStyleProps, CommonSeriesSettingsLabel, ICommonSeriesSettingsLabelProps, CommonSeriesSettingsSelectionStyle, ICommonSeriesSettingsSelectionStyleProps, Connector, IConnectorProps, ConstantLine, IConstantLineProps, ConstantLineLabel, IConstantLineLabelProps, ConstantLineStyle, IConstantLineStyleProps, Crosshair, ICrosshairProps, DataPrepareSettings, IDataPrepareSettingsProps, DragBoxStyle, IDragBoxStyleProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Grid, IGridProps, Hatching, IHatchingProps, Height, IHeightProps, HorizontalLine, IHorizontalLineProps, HorizontalLineLabel, IHorizontalLineLabelProps, HoverStyle, IHoverStyleProps, Image, IImageProps, Label, ILabelProps, Legend, ILegendProps, LegendTitle, ILegendTitleProps, LegendTitleSubtitle, ILegendTitleSubtitleProps, Length, ILengthProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, MinorGrid, IMinorGridProps, MinorTick, IMinorTickProps, MinorTickInterval, IMinorTickIntervalProps, MinVisualRangeLength, IMinVisualRangeLengthProps, Pane, IPaneProps, PaneBorder, IPaneBorderProps, Point, IPointProps, PointBorder, IPointBorderProps, PointHoverStyle, IPointHoverStyleProps, PointImage, IPointImageProps, PointSelectionStyle, IPointSelectionStyleProps, Reduction, IReductionProps, ScrollBar, IScrollBarProps, SelectionStyle, ISelectionStyleProps, Series, ISeriesProps, SeriesBorder, ISeriesBorderProps, SeriesTemplate, ISeriesTemplateProps, Shadow, IShadowProps, Size, ISizeProps, Strip, IStripProps, StripLabel, IStripLabelProps, StripStyle, IStripStyleProps, StripStyleLabel, IStripStyleLabelProps, Subtitle, ISubtitleProps, Tick, ITickProps, TickInterval, ITickIntervalProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps, Url, IUrlProps, ValueAxis, IValueAxisProps, ValueErrorBar, IValueErrorBarProps, VerticalLine, IVerticalLineProps, VisualRange, IVisualRangeProps, WholeRange, IWholeRangeProps, Width, IWidthProps, ZoomAndPan, IZoomAndPanProps };
