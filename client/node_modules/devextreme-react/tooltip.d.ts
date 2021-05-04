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
import dxTooltip, { IOptions } from "devextreme/ui/tooltip";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ITooltipOptions extends IOptions, IHtmlOptions {
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
    defaultHeight?: any;
    defaultPosition?: any;
    defaultVisible?: any;
    defaultWidth?: any;
    onHeightChange?: (value: any) => void;
    onPositionChange?: (value: any) => void;
    onVisibleChange?: (value: any) => void;
    onWidthChange?: (value: any) => void;
}
declare class Tooltip extends BaseComponent<ITooltipOptions> {
    get instance(): dxTooltip;
    protected _WidgetClass: typeof dxTooltip;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultHeight: string;
        defaultPosition: string;
        defaultVisible: string;
        defaultWidth: string;
    };
    protected _expectedChildren: {
        animation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        hideEvent: {
            optionName: string;
            isCollectionItem: boolean;
        };
        position: {
            optionName: string;
            isCollectionItem: boolean;
        };
        showEvent: {
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
interface IAnimationProps {
    hide?: any;
    show?: any;
}
declare class Animation extends NestedOption<IAnimationProps> {
    static OptionName: string;
    static ExpectedChildren: {
        hide: {
            optionName: string;
            isCollectionItem: boolean;
        };
        show: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IAtProps {
    x?: any;
    y?: any;
}
declare class At extends NestedOption<IAtProps> {
    static OptionName: string;
}
interface IBoundaryOffsetProps {
    x?: any;
    y?: any;
}
declare class BoundaryOffset extends NestedOption<IBoundaryOffsetProps> {
    static OptionName: string;
}
interface ICollisionProps {
    x?: any;
    y?: any;
}
declare class Collision extends NestedOption<ICollisionProps> {
    static OptionName: string;
}
interface IHideProps {
    complete?: any;
    delay?: any;
    direction?: any;
    duration?: any;
    easing?: any;
    from?: any;
    staggerDelay?: any;
    start?: any;
    to?: any;
    type?: any;
}
declare class Hide extends NestedOption<IHideProps> {
    static OptionName: string;
}
interface IHideEventProps {
    delay?: any;
    name?: any;
}
declare class HideEvent extends NestedOption<IHideEventProps> {
    static OptionName: string;
}
interface IMyProps {
    x?: any;
    y?: any;
}
declare class My extends NestedOption<IMyProps> {
    static OptionName: string;
}
interface IOffsetProps {
    x?: any;
    y?: any;
}
declare class Offset extends NestedOption<IOffsetProps> {
    static OptionName: string;
}
interface IPositionProps {
    at?: {
        x?: any;
        y?: any;
    };
    boundary?: any;
    boundaryOffset?: {
        x?: any;
        y?: any;
    };
    collision?: {
        x?: any;
        y?: any;
    };
    my?: {
        x?: any;
        y?: any;
    };
    of?: any;
    offset?: {
        x?: any;
        y?: any;
    };
}
declare class Position extends NestedOption<IPositionProps> {
    static OptionName: string;
    static ExpectedChildren: {
        at: {
            optionName: string;
            isCollectionItem: boolean;
        };
        boundaryOffset: {
            optionName: string;
            isCollectionItem: boolean;
        };
        collision: {
            optionName: string;
            isCollectionItem: boolean;
        };
        my: {
            optionName: string;
            isCollectionItem: boolean;
        };
        offset: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IShowProps {
    complete?: any;
    delay?: any;
    direction?: any;
    duration?: any;
    easing?: any;
    from?: any;
    staggerDelay?: any;
    start?: any;
    to?: any;
    type?: any;
}
declare class Show extends NestedOption<IShowProps> {
    static OptionName: string;
}
interface IShowEventProps {
    delay?: any;
    name?: any;
}
declare class ShowEvent extends NestedOption<IShowEventProps> {
    static OptionName: string;
}
export default Tooltip;
export { Tooltip, ITooltipOptions, Animation, IAnimationProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Collision, ICollisionProps, Hide, IHideProps, HideEvent, IHideEventProps, My, IMyProps, Offset, IOffsetProps, Position, IPositionProps, Show, IShowProps, ShowEvent, IShowEventProps };
