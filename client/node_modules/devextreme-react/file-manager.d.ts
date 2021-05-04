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
import dxFileManager, { IOptions } from "devextreme/ui/file_manager";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IFileManagerOptions extends IOptions, IHtmlOptions {
}
declare class FileManager extends BaseComponent<IFileManagerOptions> {
    get instance(): dxFileManager;
    protected _WidgetClass: typeof dxFileManager;
    protected independentEvents: string[];
    protected _expectedChildren: {
        contextMenu: {
            optionName: string;
            isCollectionItem: boolean;
        };
        itemView: {
            optionName: string;
            isCollectionItem: boolean;
        };
        permissions: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbar: {
            optionName: string;
            isCollectionItem: boolean;
        };
        upload: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IColumnProps {
    alignment?: any;
    caption?: any;
    cssClass?: any;
    dataField?: any;
    dataType?: any;
    hidingPriority?: any;
    sortIndex?: any;
    sortOrder?: any;
    visible?: any;
    visibleIndex?: any;
    width?: any;
}
declare class Column extends NestedOption<IColumnProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IContextMenuProps {
    items?: any;
}
declare class ContextMenu extends NestedOption<IContextMenuProps> {
    static OptionName: string;
    static ExpectedChildren: {
        contextMenuItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IContextMenuItemProps {
    beginGroup?: any;
    closeMenuOnClick?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    items?: any;
    name?: any;
    selectable?: any;
    selected?: any;
    template?: any;
    text?: any;
    visible?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class ContextMenuItem extends NestedOption<IContextMenuItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IDetailsProps {
    columns?: any;
}
declare class Details extends NestedOption<IDetailsProps> {
    static OptionName: string;
    static ExpectedChildren: {
        column: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFileSelectionItemProps {
    cssClass?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    locateInMenu?: any;
    location?: any;
    menuItemTemplate?: any;
    name?: any;
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
declare class FileSelectionItem extends NestedOption<IFileSelectionItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IItemProps {
    beginGroup?: any;
    closeMenuOnClick?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    items?: any;
    name?: any;
    selectable?: any;
    selected?: any;
    template?: any;
    text?: any;
    visible?: any;
    cssClass?: any;
    locateInMenu?: any;
    location?: any;
    menuItemTemplate?: any;
    options?: any;
    showText?: any;
    widget?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
    menuItemRender?: (...params: any) => React.ReactNode;
    menuItemComponent?: React.ComponentType<any>;
    menuItemKeyFn?: (data: any) => string;
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
interface IItemViewProps {
    details?: {
        columns?: any;
    };
    mode?: any;
    showFolders?: any;
    showParentFolder?: any;
}
declare class ItemView extends NestedOption<IItemViewProps> {
    static OptionName: string;
    static ExpectedChildren: {
        details: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPermissionsProps {
    copy?: any;
    create?: any;
    delete?: any;
    download?: any;
    move?: any;
    rename?: any;
    upload?: any;
}
declare class Permissions extends NestedOption<IPermissionsProps> {
    static OptionName: string;
}
interface IToolbarProps {
    fileSelectionItems?: any;
    items?: any;
}
declare class Toolbar extends NestedOption<IToolbarProps> {
    static OptionName: string;
    static ExpectedChildren: {
        fileSelectionItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbarItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IToolbarItemProps {
    cssClass?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    locateInMenu?: any;
    location?: any;
    menuItemTemplate?: any;
    name?: any;
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
interface IUploadProps {
    chunkSize?: any;
    maxFileSize?: any;
}
declare class Upload extends NestedOption<IUploadProps> {
    static OptionName: string;
}
export default FileManager;
export { FileManager, IFileManagerOptions, Column, IColumnProps, ContextMenu, IContextMenuProps, ContextMenuItem, IContextMenuItemProps, Details, IDetailsProps, FileSelectionItem, IFileSelectionItemProps, Item, IItemProps, ItemView, IItemViewProps, Permissions, IPermissionsProps, Toolbar, IToolbarProps, ToolbarItem, IToolbarItemProps, Upload, IUploadProps };
