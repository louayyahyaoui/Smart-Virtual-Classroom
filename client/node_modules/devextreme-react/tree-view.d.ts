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
import dxTreeView, { IOptions } from "devextreme/ui/tree_view";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ITreeViewOptions extends IOptions, IHtmlOptions {
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    defaultItems?: any;
    onItemsChange?: (value: any) => void;
}
declare class TreeView extends BaseComponent<ITreeViewOptions> {
    get instance(): dxTreeView;
    protected _WidgetClass: typeof dxTreeView;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultItems: string;
    };
    protected _expectedChildren: {
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        searchEditorOptions: {
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
interface IButtonProps {
    location?: any;
    name?: any;
    options?: any;
}
declare class Button extends NestedOption<IButtonProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        options: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IItemProps {
    disabled?: any;
    expanded?: any;
    hasItems?: any;
    html?: any;
    icon?: any;
    items?: any;
    parentId?: any;
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
interface IOptionsProps {
    accessKey?: any;
    activeStateEnabled?: any;
    bindingOptions?: any;
    disabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    icon?: any;
    onClick?: any;
    onContentReady?: any;
    onDisposing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    rtlEnabled?: any;
    stylingMode?: any;
    tabIndex?: any;
    template?: any;
    text?: any;
    type?: any;
    useSubmitBehavior?: any;
    validationGroup?: any;
    visible?: any;
    width?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Options extends NestedOption<IOptionsProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface ISearchEditorOptionsProps {
    accessKey?: any;
    activeStateEnabled?: any;
    bindingOptions?: any;
    buttons?: any;
    disabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    inputAttr?: any;
    isValid?: any;
    mask?: any;
    maskChar?: any;
    maskInvalidMessage?: any;
    maskRules?: any;
    maxLength?: any;
    mode?: any;
    name?: any;
    onChange?: any;
    onContentReady?: any;
    onCopy?: any;
    onCut?: any;
    onDisposing?: any;
    onEnterKey?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onInitialized?: any;
    onInput?: any;
    onKeyDown?: any;
    onKeyPress?: any;
    onKeyUp?: any;
    onOptionChanged?: any;
    onPaste?: any;
    onValueChanged?: any;
    placeholder?: any;
    readOnly?: any;
    rtlEnabled?: any;
    showClearButton?: any;
    showMaskMode?: any;
    spellcheck?: any;
    stylingMode?: any;
    tabIndex?: any;
    text?: any;
    useMaskedValue?: any;
    validationError?: any;
    validationErrors?: any;
    validationMessageMode?: any;
    validationStatus?: any;
    value?: any;
    valueChangeEvent?: any;
    visible?: any;
    width?: any;
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class SearchEditorOptions extends NestedOption<ISearchEditorOptionsProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultValue: string;
    };
    static ExpectedChildren: {
        button: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
export default TreeView;
export { TreeView, ITreeViewOptions, Button, IButtonProps, Item, IItemProps, Options, IOptionsProps, SearchEditorOptions, ISearchEditorOptionsProps };
