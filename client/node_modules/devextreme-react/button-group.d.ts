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
import dxButtonGroup, { IOptions } from "devextreme/ui/button_group";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IButtonGroupOptions extends IOptions, IHtmlOptions {
    buttonRender?: (...params: any) => React.ReactNode;
    buttonComponent?: React.ComponentType<any>;
    buttonKeyFn?: (data: any) => string;
    defaultSelectedItemKeys?: any;
    defaultSelectedItems?: any;
    onSelectedItemKeysChange?: (value: any) => void;
    onSelectedItemsChange?: (value: any) => void;
}
declare class ButtonGroup extends BaseComponent<IButtonGroupOptions> {
    get instance(): dxButtonGroup;
    protected _WidgetClass: typeof dxButtonGroup;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
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
    disabled?: any;
    hint?: any;
    html?: any;
    icon?: any;
    template?: any;
    text?: any;
    type?: any;
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
export default ButtonGroup;
export { ButtonGroup, IButtonGroupOptions, Item, IItemProps };
