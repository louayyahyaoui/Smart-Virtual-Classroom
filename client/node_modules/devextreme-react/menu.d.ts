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
import dxMenu, { IOptions } from "devextreme/ui/menu";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IMenuOptions extends IOptions, IHtmlOptions {
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    defaultItems?: any;
    defaultSelectedItem?: any;
    onItemsChange?: (value: any) => void;
    onSelectedItemChange?: (value: any) => void;
}
declare class Menu extends BaseComponent<IMenuOptions> {
    get instance(): dxMenu;
    protected _WidgetClass: typeof dxMenu;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultItems: string;
        defaultSelectedItem: string;
    };
    protected _expectedChildren: {
        animation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        showFirstSubmenuMode: {
            optionName: string;
            isCollectionItem: boolean;
        };
        showSubmenuMode: {
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
interface IDelayProps {
    hide?: any;
    show?: any;
}
declare class Delay extends NestedOption<IDelayProps> {
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
interface IItemProps {
    beginGroup?: any;
    closeMenuOnClick?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    items?: any;
    selectable?: any;
    selected?: any;
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
interface IShowFirstSubmenuModeProps {
    delay?: {
        hide?: any;
        show?: any;
    };
    name?: any;
}
declare class ShowFirstSubmenuMode extends NestedOption<IShowFirstSubmenuModeProps> {
    static OptionName: string;
    static ExpectedChildren: {
        delay: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IShowSubmenuModeProps {
    delay?: {
        hide?: any;
        show?: any;
    };
    name?: any;
}
declare class ShowSubmenuMode extends NestedOption<IShowSubmenuModeProps> {
    static OptionName: string;
    static ExpectedChildren: {
        delay: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
export default Menu;
export { Menu, IMenuOptions, Animation, IAnimationProps, Delay, IDelayProps, Hide, IHideProps, Item, IItemProps, Show, IShowProps, ShowFirstSubmenuMode, IShowFirstSubmenuModeProps, ShowSubmenuMode, IShowSubmenuModeProps };
