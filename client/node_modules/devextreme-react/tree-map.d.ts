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
import dxTreeMap, { IOptions } from "devextreme/viz/tree_map";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ITreeMapOptions extends IOptions, IHtmlOptions {
    defaultLoadingIndicator?: any;
    onLoadingIndicatorChange?: (value: any) => void;
}
declare class TreeMap extends BaseComponent<ITreeMapOptions> {
    get instance(): dxTreeMap;
    protected _WidgetClass: typeof dxTreeMap;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultLoadingIndicator: string;
    };
    protected _expectedChildren: {
        colorizer: {
            optionName: string;
            isCollectionItem: boolean;
        };
        export: {
            optionName: string;
            isCollectionItem: boolean;
        };
        group: {
            optionName: string;
            isCollectionItem: boolean;
        };
        loadingIndicator: {
            optionName: string;
            isCollectionItem: boolean;
        };
        size: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tile: {
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
interface IBorderProps {
    color?: any;
    width?: any;
    dashStyle?: any;
    opacity?: any;
    visible?: any;
}
declare class Border extends NestedOption<IBorderProps> {
    static OptionName: string;
}
interface IColorizerProps {
    colorCodeField?: any;
    colorizeGroups?: any;
    palette?: any;
    paletteExtensionMode?: any;
    range?: any;
    type?: any;
}
declare class Colorizer extends NestedOption<IColorizerProps> {
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
interface IGroupProps {
    border?: {
        color?: any;
        width?: any;
    };
    color?: any;
    headerHeight?: any;
    hoverEnabled?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            width?: any;
        };
        color?: any;
    };
    label?: {
        font?: any;
        textOverflow?: any;
        visible?: any;
    };
    padding?: any;
    selectionStyle?: {
        border?: {
            color?: any;
            width?: any;
        };
        color?: any;
    };
}
declare class Group extends NestedOption<IGroupProps> {
    static OptionName: string;
    static ExpectedChildren: {
        border: {
            optionName: string;
            isCollectionItem: boolean;
        };
        groupLabel: {
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
        treeMapborder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IGroupLabelProps {
    font?: any;
    textOverflow?: any;
    visible?: any;
}
declare class GroupLabel extends NestedOption<IGroupLabelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        font: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IHoverStyleProps {
    border?: {
        color?: any;
        width?: any;
    };
    color?: any;
}
declare class HoverStyle extends NestedOption<IHoverStyleProps> {
    static OptionName: string;
}
interface ILabelProps {
    font?: any;
    textOverflow?: any;
    visible?: any;
    wordWrap?: any;
}
declare class Label extends NestedOption<ILabelProps> {
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
interface ISelectionStyleProps {
    border?: {
        color?: any;
        width?: any;
    };
    color?: any;
}
declare class SelectionStyle extends NestedOption<ISelectionStyleProps> {
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
interface ITileProps {
    border?: {
        color?: any;
        width?: any;
    };
    color?: any;
    hoverStyle?: {
        border?: {
            color?: any;
            width?: any;
        };
        color?: any;
    };
    label?: {
        font?: any;
        textOverflow?: any;
        visible?: any;
        wordWrap?: any;
    };
    selectionStyle?: {
        border?: {
            color?: any;
            width?: any;
        };
        color?: any;
    };
}
declare class Tile extends NestedOption<ITileProps> {
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
        tileLabel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        treeMapborder: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ITileLabelProps {
    font?: any;
    textOverflow?: any;
    visible?: any;
    wordWrap?: any;
}
declare class TileLabel extends NestedOption<ITileLabelProps> {
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
interface ITreeMapborderProps {
    color?: any;
    width?: any;
}
declare class TreeMapborder extends NestedOption<ITreeMapborderProps> {
    static OptionName: string;
}
export default TreeMap;
export { TreeMap, ITreeMapOptions, Border, IBorderProps, Colorizer, IColorizerProps, Export, IExportProps, Font, IFontProps, Format, IFormatProps, Group, IGroupProps, GroupLabel, IGroupLabelProps, HoverStyle, IHoverStyleProps, Label, ILabelProps, LoadingIndicator, ILoadingIndicatorProps, Margin, IMarginProps, SelectionStyle, ISelectionStyleProps, Shadow, IShadowProps, Size, ISizeProps, Subtitle, ISubtitleProps, Tile, ITileProps, TileLabel, ITileLabelProps, Title, ITitleProps, Tooltip, ITooltipProps, TooltipBorder, ITooltipBorderProps, TreeMapborder, ITreeMapborderProps };
