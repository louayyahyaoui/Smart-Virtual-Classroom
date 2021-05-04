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
import dxHtmlEditor, { IOptions } from "devextreme/ui/html_editor";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IHtmlEditorOptions extends IOptions, IHtmlOptions {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class HtmlEditor extends BaseComponent<IHtmlEditorOptions> {
    get instance(): dxHtmlEditor;
    protected _WidgetClass: typeof dxHtmlEditor;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
    };
    protected _expectedChildren: {
        mediaResizing: {
            optionName: string;
            isCollectionItem: boolean;
        };
        mention: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbar: {
            optionName: string;
            isCollectionItem: boolean;
        };
        variables: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IItemProps {
    cssClass?: any;
    disabled?: any;
    formatName?: any;
    formatValues?: any;
    html?: any;
    locateInMenu?: any;
    location?: any;
    menuItemTemplate?: any;
    options?: any;
    showText?: any;
    template?: any;
    text?: any;
    visible?: any;
    widget?: any;
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    menuItemKeyFn?: (data: any) => string;
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
interface IMediaResizingProps {
    allowedTargets?: any;
    enabled?: any;
}
declare class MediaResizing extends NestedOption<IMediaResizingProps> {
    static OptionName: string;
}
interface IMentionProps {
    dataSource?: any;
    displayExpr?: any;
    itemTemplate?: any;
    marker?: any;
    minSearchLength?: any;
    searchExpr?: any;
    searchTimeout?: any;
    template?: any;
    valueExpr?: any;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Mention extends NestedOption<IMentionProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IToolbarProps {
    container?: any;
    items?: any;
    multiline?: any;
}
declare class Toolbar extends NestedOption<IToolbarProps> {
    static OptionName: string;
    static ExpectedChildren: {
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IVariablesProps {
    dataSource?: any;
    escapeChar?: any;
}
declare class Variables extends NestedOption<IVariablesProps> {
    static OptionName: string;
}
export default HtmlEditor;
export { HtmlEditor, IHtmlEditorOptions, Item, IItemProps, MediaResizing, IMediaResizingProps, Mention, IMentionProps, Toolbar, IToolbarProps, Variables, IVariablesProps };
