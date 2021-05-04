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
import dxLinearGauge, { IOptions } from "devextreme/viz/linear_gauge";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ILinearGaugeOptions extends IOptions, IHtmlOptions {
    defaultLoadingIndicator?: any;
    defaultSubvalues?: any;
    defaultValue?: any;
    onLoadingIndicatorChange?: (value: any) => void;
    onSubvaluesChange?: (value: any) => void;
    onValueChange?: (value: any) => void;
}
declare class LinearGauge extends BaseComponent<ILinearGaugeOptions> {
    get instance(): dxLinearGauge;
    protected _WidgetClass: typeof dxLinearGauge;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultLoadingIndicator: string;
        defaultSubvalues: string;
        defaultValue: string;
    };
    protected _expectedChildren: {
        animation: {
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
        loadingIndicator: {
            optionName: string;
            isCollectionItem: boolean;
        };
        margin: {
            optionName: string;
            isCollectionItem: boolean;
        };
        rangeContainer: {
            optionName: string;
            isCollectionItem: boolean;
        };
        scale: {
            optionName: string;
            isCollectionItem: boolean;
        };
        size: {
            optionName: string;
            isCollectionItem: boolean;
        };
        subvalueIndicator: {
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
        valueIndicator: {
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
    orientation?: any;
}
declare class Geometry extends NestedOption<IGeometryProps> {
    static OptionName: string;
}
interface ILabelProps {
    customizeText?: any;
    font?: any;
    format?: any;
    indentFromTick?: any;
    overlappingBehavior?: any;
    useRangeColors?: any;
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
interface IMinorTickProps {
    color?: any;
    length?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class MinorTick extends NestedOption<IMinorTickProps> {
    static OptionName: string;
}
interface IRangeProps {
    color?: any;
    endValue?: any;
    startValue?: any;
}
declare class Range extends NestedOption<IRangeProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IRangeContainerProps {
    backgroundColor?: any;
    horizontalOrientation?: any;
    offset?: any;
    palette?: any;
    paletteExtensionMode?: any;
    ranges?: {
        color?: any;
        endValue?: any;
        startValue?: any;
    }[];
    verticalOrientation?: any;
    width?: {
        end?: any;
        start?: any;
    };
}
declare class RangeContainer extends NestedOption<IRangeContainerProps> {
    static OptionName: string;
    static ExpectedChildren: {
        range: {
            optionName: string;
            isCollectionItem: boolean;
        };
        width: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IScaleProps {
    allowDecimals?: any;
    customMinorTicks?: any;
    customTicks?: any;
    endValue?: any;
    horizontalOrientation?: any;
    label?: {
        customizeText?: any;
        font?: any;
        format?: any;
        indentFromTick?: any;
        overlappingBehavior?: any;
        useRangeColors?: any;
        visible?: any;
    };
    minorTick?: {
        color?: any;
        length?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    minorTickInterval?: any;
    scaleDivisionFactor?: any;
    startValue?: any;
    tick?: {
        color?: any;
        length?: any;
        opacity?: any;
        visible?: any;
        width?: any;
    };
    tickInterval?: any;
    verticalOrientation?: any;
}
declare class Scale extends NestedOption<IScaleProps> {
    static OptionName: string;
    static ExpectedChildren: {
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
interface ISubvalueIndicatorProps {
    arrowLength?: any;
    backgroundColor?: any;
    baseValue?: any;
    beginAdaptingAtRadius?: any;
    color?: any;
    horizontalOrientation?: any;
    indentFromCenter?: any;
    length?: any;
    offset?: any;
    palette?: any;
    secondColor?: any;
    secondFraction?: any;
    size?: any;
    spindleGapSize?: any;
    spindleSize?: any;
    text?: {
        customizeText?: any;
        font?: any;
        format?: any;
        indent?: any;
    };
    type?: any;
    verticalOrientation?: any;
    width?: any;
}
declare class SubvalueIndicator extends NestedOption<ISubvalueIndicatorProps> {
    static OptionName: string;
    static ExpectedChildren: {
        text: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ITextProps {
    customizeText?: any;
    font?: any;
    format?: any;
    indent?: any;
}
declare class Text extends NestedOption<ITextProps> {
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
interface ITickProps {
    color?: any;
    length?: any;
    opacity?: any;
    visible?: any;
    width?: any;
}
declare class Tick extends NestedOption<ITickProps> {
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
interface IValueIndicatorProps {
    arrowLength?: any;
    backgroundColor?: any;
    baseValue?: any;
    beginAdaptingAtRadius?: any;
    color?: any;
    horizontalOrientation?: any;
    indentFromCenter?: any;
    length?: any;
    offset?: any;
    palette?: any;
    secondColor?: any;
    secondFraction?: any;
    size?: any;
    spindleGapSize?: any;
    spindleSize?: any;
    text?: {
        customizeText?: any;
        font?: any;
        format?: any;
        indent?: any;
    };
    type?: any;
    verticalOrientation?: any;
    width?: any;
}
declare class ValueIndicator extends NestedOption<IValueIndicatorProps> {
    static OptionName: string;
}
interface IWidthProps {
    end?: any;
    start?: any;
}
declare class Width extends NestedOption<IWidthProps> {
    static OptionName: string;
}
export default LinearGauge;
export { LinearGauge, ILinearGaugeOptions, Animation, IAnimationProps, Border, IBorderProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Geometry, IGeometryProps, Label, ILabelProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, MinorTick, IMinorTickProps, Range, IRangeProps, RangeContainer, IRangeContainerProps, Scale, IScaleProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, SubvalueIndicator, ISubvalueIndicatorProps, Text, ITextProps, Tick, ITickProps, Title, ITitleProps, Tooltip, ITooltipProps, ValueIndicator, IValueIndicatorProps, Width, IWidthProps };
