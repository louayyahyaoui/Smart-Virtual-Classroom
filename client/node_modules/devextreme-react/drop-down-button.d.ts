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
import dxDropDownButton, { IOptions } from "devextreme/ui/drop_down_button";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IDropDownButtonOptions extends IOptions, IHtmlOptions {
    dropDownContentRender?: (...params: any) => React.ReactNode;
    dropDownContentComponent?: React.ComponentType<any>;
    dropDownContentKeyFn?: (data: any) => string;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
}
declare class DropDownButton extends BaseComponent<IDropDownButtonOptions> {
    get instance(): dxDropDownButton;
    protected _WidgetClass: typeof dxDropDownButton;
    protected independentEvents: string[];
    protected _expectedChildren: {
        dropDownOptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
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
interface IDropDownOptionsProps {
    accessKey?: any;
    activeStateEnabled?: any;
    animation?: {
        hide?: any;
        show?: any;
    };
    bindingOptions?: any;
    closeOnOutsideClick?: any;
    container?: any;
    contentTemplate?: any;
    deferRendering?: any;
    disabled?: any;
    dragEnabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    fullScreen?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    maxHeight?: any;
    maxWidth?: any;
    minHeight?: any;
    minWidth?: any;
    onContentReady?: any;
    onDisposing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onHidden?: any;
    onHiding?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    onResize?: any;
    onResizeEnd?: any;
    onResizeStart?: any;
    onShowing?: any;
    onShown?: any;
    onTitleRendered?: any;
    position?: any;
    resizeEnabled?: any;
    rtlEnabled?: any;
    shading?: any;
    shadingColor?: any;
    showCloseButton?: any;
    showTitle?: any;
    tabIndex?: any;
    title?: any;
    titleTemplate?: any;
    toolbarItems?: {
        disabled?: any;
        html?: any;
        location?: any;
        options?: any;
        template?: any;
        text?: any;
        toolbar?: any;
        visible?: any;
        widget?: any;
    }[];
    visible?: any;
    width?: any;
    defaultHeight?: any;
    onHeightChange?: (value: any) => void;
    defaultPosition?: any;
    onPositionChange?: (value: any) => void;
    defaultVisible?: any;
    onVisibleChange?: (value: any) => void;
    defaultWidth?: any;
    onWidthChange?: (value: any) => void;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
    titleRender?: (...params: any) => React.ReactNode;
    titleComponent?: React.ComponentType<any>;
    titleKeyFn?: (data: any) => string;
}
declare class DropDownOptions extends NestedOption<IDropDownOptionsProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultHeight: string;
        defaultPosition: string;
        defaultVisible: string;
        defaultWidth: string;
    };
    static ExpectedChildren: {
        animation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        position: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbarItem: {
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
interface IItemProps {
    badge?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    key?: any;
    onClick?: any;
    showChevron?: any;
    template?: any;
    text?: any;
    visible?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Item extends NestedOption<IItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
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
interface IToolbarItemProps {
    disabled?: any;
    html?: any;
    location?: any;
    options?: any;
    template?: any;
    text?: any;
    toolbar?: any;
    visible?: any;
    widget?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class ToolbarItem extends NestedOption<IToolbarItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default DropDownButton;
export { DropDownButton, IDropDownButtonOptions, Animation, IAnimationProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Collision, ICollisionProps, DropDownOptions, IDropDownOptionsProps, Hide, IHideProps, Item, IItemProps, My, IMyProps, Offset, IOffsetProps, Position, IPositionProps, Show, IShowProps, ToolbarItem, IToolbarItemProps };
