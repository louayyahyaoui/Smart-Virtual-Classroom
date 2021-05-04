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
import dxList, { IOptions } from "devextreme/ui/list";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IListOptions extends IOptions, IHtmlOptions {
    groupRender?: (...params: any) => React.ReactNode;
    groupComponent?: React.ComponentType<any>;
    groupKeyFn?: (data: any) => string;
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    defaultItems?: any;
    defaultSelectedItemKeys?: any;
    defaultSelectedItems?: any;
    onItemsChange?: (value: any) => void;
    onSelectedItemKeysChange?: (value: any) => void;
    onSelectedItemsChange?: (value: any) => void;
}
declare class List extends BaseComponent<IListOptions> {
    get instance(): dxList;
    protected _WidgetClass: typeof dxList;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultItems: string;
        defaultSelectedItemKeys: string;
        defaultSelectedItems: string;
    };
    protected _expectedChildren: {
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        itemDragging: {
            optionName: string;
            isCollectionItem: boolean;
        };
        menuItem: {
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
interface ICursorOffsetProps {
    x?: any;
    y?: any;
}
declare class CursorOffset extends NestedOption<ICursorOffsetProps> {
    static OptionName: string;
}
interface IItemProps {
    badge?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    key?: any;
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
interface IItemDraggingProps {
    allowDropInsideItem?: any;
    allowReordering?: any;
    autoScroll?: any;
    bindingOptions?: any;
    boundary?: any;
    container?: any;
    contentTemplate?: any;
    cursorOffset?: {
        x?: any;
        y?: any;
    };
    data?: any;
    dragDirection?: any;
    dragTemplate?: any;
    dropFeedbackMode?: any;
    elementAttr?: any;
    filter?: any;
    group?: any;
    handle?: any;
    height?: any;
    itemOrientation?: any;
    moveItemOnDrop?: any;
    onAdd?: any;
    onDisposing?: any;
    onDragChange?: any;
    onDragEnd?: any;
    onDragMove?: any;
    onDragStart?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    onPlaceholderPrepared?: any;
    onRemove?: any;
    onReorder?: any;
    rtlEnabled?: any;
    scrollSensitivity?: any;
    scrollSpeed?: any;
    width?: any;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
    dragRender?: (...params: any) => React.ReactNode;
    dragComponent?: React.ComponentType<any>;
    dragKeyFn?: (data: any) => string;
}
declare class ItemDragging extends NestedOption<IItemDraggingProps> {
    static OptionName: string;
    static ExpectedChildren: {
        cursorOffset: {
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
interface IMenuItemProps {
    action?: any;
    text?: any;
}
declare class MenuItem extends NestedOption<IMenuItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
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
export default List;
export { List, IListOptions, Button, IButtonProps, CursorOffset, ICursorOffsetProps, Item, IItemProps, ItemDragging, IItemDraggingProps, MenuItem, IMenuItemProps, Options, IOptionsProps, SearchEditorOptions, ISearchEditorOptionsProps };
