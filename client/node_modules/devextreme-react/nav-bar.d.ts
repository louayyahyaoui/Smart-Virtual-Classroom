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
import dxNavBar, { IOptions } from "devextreme/ui/nav_bar";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface INavBarOptions extends IOptions, IHtmlOptions {
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    defaultItems?: any;
    defaultSelectedIndex?: any;
    defaultSelectedItem?: any;
    defaultSelectedItemKeys?: any;
    defaultSelectedItems?: any;
    onItemsChange?: (value: any) => void;
    onSelectedIndexChange?: (value: any) => void;
    onSelectedItemChange?: (value: any) => void;
    onSelectedItemKeysChange?: (value: any) => void;
    onSelectedItemsChange?: (value: any) => void;
}
declare class NavBar extends BaseComponent<INavBarOptions> {
    get instance(): dxNavBar;
    protected _WidgetClass: typeof dxNavBar;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultItems: string;
        defaultSelectedIndex: string;
        defaultSelectedItem: string;
        defaultSelectedItemKeys: string;
        defaultSelectedItems: string;
    };
    protected _expectedChildren: {
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
interface IItemProps {
    badge?: any;
    disabled?: any;
    html?: any;
    icon?: any;
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
export default NavBar;
export { NavBar, INavBarOptions, Item, IItemProps };
