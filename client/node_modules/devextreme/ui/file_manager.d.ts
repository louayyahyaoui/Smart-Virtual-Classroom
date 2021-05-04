/**
* DevExtreme (ui/file_manager.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    event
} from '../events/index';

import FileSystemItem from '../file_management/file_system_item';

import {
    dxContextMenuItem
} from './context_menu';

import {
    dxToolbarItem
} from './toolbar';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

import {
    template
} from '../core/templates/template';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFileManagerOptions extends WidgetOptions<dxFileManager> {
    /**
     * Specifies the allowed upload file extensions.
     */
    allowedFileExtensions?: Array<string>;
    /**
     * Configures the context menu settings.
     */
    contextMenu?: dxFileManagerContextMenu;
    /**
     * Specifies the path that is used when the FileManager is initialized.
     */
    currentPath?: string;
    /**
     * Specifies an array of path keys to the current location.
     */
    currentPathKeys?: Array<string>;
    /**
     * Customizes columns in details view. Applies only if itemView.mode is 'details'.
     */
    customizeDetailColumns?: ((columns: Array<dxFileManagerDetailsColumn>) => Array<dxFileManagerDetailsColumn>);
    /**
     * Allows you to provide custom icons to be used as thumbnails.
     */
    customizeThumbnail?: ((fileSystemItem: FileSystemItem) => string);
    /**
     * Specifies the file system provider.
     */
    fileSystemProvider?: any;
    /**
     * Configures the file and folder view.
     */
    itemView?: {details?: { columns?: Array<dxFileManagerDetailsColumn | string>}, mode?: 'details' | 'thumbnails', showFolders?: boolean, showParentFolder?: boolean };
    /**
     * A function that is executed when a context menu item is clicked.
     */
    onContextMenuItemClick?: ((e: { component?: dxFileManager, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event, fileSystemItem?: FileSystemItem, viewArea?: 'navPane' | 'itemView' }) => any);
    /**
     * A function that is executed when the current directory is changed.
     */
    onCurrentDirectoryChanged?: ((e: { component?: dxFileManager, element?: dxElement, model?: any, directory?: FileSystemItem }) => any);
    /**
     * A function that is executed when the selected file is opened.
     */
    onSelectedFileOpened?: ((e: { component?: dxFileManager, element?: dxElement, model?: any, file?: FileSystemItem }) => any);
    /**
     * A function that is executed when a file system item is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: dxFileManager, element?: dxElement, model?: any, currentSelectedItemKeys?: Array<string>, currentDeselectedItemKeys?: Array<string>, selectedItems?: Array<FileSystemItem>, selectedItemKeys?: Array<string>}) => any);
    /**
     * A function that is executed when a toolbar item is clicked.
     */
    onToolbarItemClick?: ((e: { component?: dxFileManager, element?: dxElement, model?: any, itemData?: any, itemElement?: dxElement, itemIndex?: number, event?: event }) => any);
    /**
     * A function that is executed when the focused item is changed.
     */
    onFocusedItemChanged?: ((e: { component?: dxFileManager, element?: dxElement, model?: any, item?: FileSystemItem, itemElement?: dxElement }) => any);
    /**
     * A function that is executed when an error occurs.
     */
    onErrorOccurred?: ((e: { component?: dxFileManager, element?: dxElement, model?: any, errorCode?: number, errorText?: string, fileSystemItem?: FileSystemItem }) => any);
    /**
     * Specifies actions that a user is allowed to perform on files and folders.
     */
    permissions?: { copy?: boolean, create?: boolean, download?: boolean, move?: boolean, delete?: boolean, rename?: boolean, upload?: boolean };
    /**
     * Specifies the root folder name.
     */
    rootFolderName?: string;
    /**
     * Specifies whether a user can select a single or multiple files and folders in the item view simultaneously.
     */
    selectionMode?: 'multiple' | 'single';
    /**
     * Contains an array of initially or currently selected files and directories' keys.
     */
    selectedItemKeys?: Array<string>;
    /**
     * Specifies a key of the initially or currently focused item.
     */
    focusedItemKey?: string;
    /**
     * Configures toolbar settings.
     */
    toolbar?: dxFileManagerToolbar;
    /**
     * Configures upload settings.
     */
    upload?: { maxFileSize?: number, chunkSize?: number };
}
/**
 * The FileManager is a UI component that allows users to upload, select, and manage files and directories in different file storages.
 */
export default class dxFileManager extends Widget {
    constructor(element: Element, options?: dxFileManagerOptions)
    constructor(element: JQuery, options?: dxFileManagerOptions)
    /**
     * Gets the current directory object.
     */
    getCurrentDirectory(): any;
    /**
     * Gets the selected items.
     */
    getSelectedItems(): Array<any>;
    /**
     * Reloads data and repaints the UI component.
     */
    refresh(): Promise<any> & JQueryPromise<any>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFileManagerContextMenu {
    /**
     * Configures context menu items' settings.
     */
    items?: Array<dxFileManagerContextMenuItem | 'create' | 'upload' | 'refresh' | 'download' | 'move' | 'copy' | 'rename' | 'delete'>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFileManagerContextMenuItem extends dxContextMenuItem {
    /**
     * Configures settings of a context menu item's subitems.
     */
    items?: Array<dxFileManagerContextMenuItem>;
    /**
     * Specifies the context menu item's name.
     */
    name?: 'create' | 'upload' | 'refresh' | 'download' | 'move' | 'copy' | 'rename' | 'delete' | string;
    /**
     * Specifies the context menu item's visibility.
     */
    visible?: boolean;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    template?: template | (() => string | Element | JQuery);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFileManagerToolbar {
    /**
     * Configures settings of the toolbar items that are visible when users select files.
     */
    fileSelectionItems?: Array<dxFileManagerToolbarItem | 'showNavPane' | 'create' | 'upload' | 'refresh' | 'switchView' | 'download' | 'move' | 'copy' | 'rename' | 'delete' | 'clearSelection' | 'separator'>;
    /**
     * Configures toolbar items' settings.
     */
    items?: Array<dxFileManagerToolbarItem | 'showNavPane' | 'create' | 'upload' | 'refresh' | 'switchView' | 'download' | 'move' | 'copy' | 'rename' | 'delete' | 'clearSelection' | 'separator'>;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFileManagerToolbarItem extends dxToolbarItem {
    /**
     * Specifies the icon to be displayed on the toolbar item.
     */
    icon?: string;
    /**
     * Specifies the toolbar item's location.
     */
    location?: 'after' | 'before' | 'center';
    /**
     * Specifies the toolbar item's name.
     */
    name?: 'showNavPane' | 'create' | 'upload' | 'refresh' | 'switchView' | 'download' | 'move' | 'copy' | 'rename' | 'delete' | 'clearSelection' | 'separator' | string;
    /**
     * Specifies the toolbar item's visibility.
     */
    visible?: boolean;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    html?: string;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    template?: template | (() => string | Element | JQuery);
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    menuItemTemplate?: template | (() => string | Element | JQuery);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxFileManagerDetailsColumn {
    /**
     * Specifies the column alignment.
     */
    alignment?: 'center' | 'left' | 'right' | undefined;
    /**
     * Specifies the column caption.
     */
    caption?: string;
    /**
     * Specifies a CSS class to be applied to the column.
     */
    cssClass?: string;
    /**
     * Specifies which data field provides data for the column.
     */
    dataField?: string;
    /**
     * Casts column values to a specific data type.
     */
    dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
    /**
     * Specifies the order in which columns are hidden when the UI component adapts to the screen or container size.
     */
    hidingPriority?: number;
    /**
     * Specifies the order in which the column is sorted.
     */
    sortIndex?: number;
    /**
     * Specifies the sort order of column values.
     */
    sortOrder?: 'asc' | 'desc' | undefined;
    /**
     * Specifies the column visibility.
     */
    visible?: boolean;
    /**
     * Specifies the position of the column in the resulting UI component.
     */
    visibleIndex?: number;
    /**
     * Specifies the column width.
     */
    width?: number | string;
}

declare global {
interface JQuery {
    dxFileManager(): JQuery;
    dxFileManager(options: "instance"): dxFileManager;
    dxFileManager(options: string): any;
    dxFileManager(options: string, ...params: any[]): any;
    dxFileManager(options: dxFileManagerOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxFileManagerOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxFileManagerOptions;