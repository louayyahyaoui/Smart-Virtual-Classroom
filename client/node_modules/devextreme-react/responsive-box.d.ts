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
import dxResponsiveBox, { IOptions } from "devextreme/ui/responsive_box";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IResponsiveBoxOptions extends IOptions, IHtmlOptions {
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    defaultItems?: any;
    onItemsChange?: (value: any) => void;
}
declare class ResponsiveBox extends BaseComponent<IResponsiveBoxOptions> {
    get instance(): dxResponsiveBox;
    protected _WidgetClass: typeof dxResponsiveBox;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultItems: string;
    };
    protected _expectedChildren: {
        col: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        row: {
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
interface IColProps {
    baseSize?: any;
    ratio?: any;
    screen?: any;
    shrink?: any;
}
declare class Col extends NestedOption<IColProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IItemProps {
    disabled?: any;
    html?: any;
    location?: {
        col?: any;
        colspan?: any;
        row?: any;
        rowspan?: any;
        screen?: any;
    }[];
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
    static ExpectedChildren: {
        location: {
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
interface ILocationProps {
    col?: any;
    colspan?: any;
    row?: any;
    rowspan?: any;
    screen?: any;
}
declare class Location extends NestedOption<ILocationProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IRowProps {
    baseSize?: any;
    ratio?: any;
    screen?: any;
    shrink?: any;
}
declare class Row extends NestedOption<IRowProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
export default ResponsiveBox;
export { ResponsiveBox, IResponsiveBoxOptions, Col, IColProps, Item, IItemProps, Location, ILocationProps, Row, IRowProps };
