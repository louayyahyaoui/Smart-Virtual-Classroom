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

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = exports.ToolbarItem = exports.Toolbar = exports.Permissions = exports.ItemView = exports.Item = exports.FileSelectionItem = exports.Details = exports.ContextMenuItem = exports.ContextMenu = exports.Column = exports.FileManager = void 0;
var file_manager_1 = require("devextreme/ui/file_manager");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var FileManager = /** @class */ (function (_super) {
    __extends(FileManager, _super);
    function FileManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = file_manager_1.default;
        _this.independentEvents = ["onContentReady", "onContextMenuItemClick", "onCurrentDirectoryChanged", "onDisposing", "onErrorOccurred", "onFocusedItemChanged", "onInitialized", "onOptionChanged", "onSelectedFileOpened", "onSelectionChanged", "onToolbarItemClick"];
        _this._expectedChildren = {
            contextMenu: { optionName: "contextMenu", isCollectionItem: false },
            itemView: { optionName: "itemView", isCollectionItem: false },
            permissions: { optionName: "permissions", isCollectionItem: false },
            toolbar: { optionName: "toolbar", isCollectionItem: false },
            upload: { optionName: "upload", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(FileManager.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return FileManager;
}(component_1.Component));
exports.FileManager = FileManager;
FileManager.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    allowedFileExtensions: PropTypes.array,
    contextMenu: PropTypes.object,
    currentPath: PropTypes.string,
    currentPathKeys: PropTypes.array,
    customizeDetailColumns: PropTypes.func,
    customizeThumbnail: PropTypes.func,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    fileSystemProvider: PropTypes.object,
    focusedItemKey: PropTypes.string,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    itemView: PropTypes.object,
    onContentReady: PropTypes.func,
    onContextMenuItemClick: PropTypes.func,
    onCurrentDirectoryChanged: PropTypes.func,
    onDisposing: PropTypes.func,
    onErrorOccurred: PropTypes.func,
    onFocusedItemChanged: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onSelectedFileOpened: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onToolbarItemClick: PropTypes.func,
    permissions: PropTypes.object,
    rootFolderName: PropTypes.string,
    rtlEnabled: PropTypes.bool,
    selectedItemKeys: PropTypes.array,
    selectionMode: PropTypes.oneOf([
        "multiple",
        "single"
    ]),
    tabIndex: PropTypes.number,
    toolbar: PropTypes.object,
    upload: PropTypes.object,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column.OptionName = "columns";
    Column.IsCollectionItem = true;
    return Column;
}(nested_option_1.default));
exports.Column = Column;
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenu.OptionName = "contextMenu";
    ContextMenu.ExpectedChildren = {
        contextMenuItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true }
    };
    return ContextMenu;
}(nested_option_1.default));
exports.ContextMenu = ContextMenu;
var ContextMenuItem = /** @class */ (function (_super) {
    __extends(ContextMenuItem, _super);
    function ContextMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenuItem.OptionName = "items";
    ContextMenuItem.IsCollectionItem = true;
    ContextMenuItem.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return ContextMenuItem;
}(nested_option_1.default));
exports.ContextMenuItem = ContextMenuItem;
var Details = /** @class */ (function (_super) {
    __extends(Details, _super);
    function Details() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Details.OptionName = "details";
    Details.ExpectedChildren = {
        column: { optionName: "columns", isCollectionItem: true }
    };
    return Details;
}(nested_option_1.default));
exports.Details = Details;
var FileSelectionItem = /** @class */ (function (_super) {
    __extends(FileSelectionItem, _super);
    function FileSelectionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileSelectionItem.OptionName = "fileSelectionItems";
    FileSelectionItem.IsCollectionItem = true;
    FileSelectionItem.TemplateProps = [{
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent",
            keyFn: "menuItemKeyFn"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return FileSelectionItem;
}(nested_option_1.default));
exports.FileSelectionItem = FileSelectionItem;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "items";
    Item.IsCollectionItem = true;
    Item.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }, {
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent",
            keyFn: "menuItemKeyFn"
        }];
    return Item;
}(nested_option_1.default));
exports.Item = Item;
var ItemView = /** @class */ (function (_super) {
    __extends(ItemView, _super);
    function ItemView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemView.OptionName = "itemView";
    ItemView.ExpectedChildren = {
        details: { optionName: "details", isCollectionItem: false }
    };
    return ItemView;
}(nested_option_1.default));
exports.ItemView = ItemView;
var Permissions = /** @class */ (function (_super) {
    __extends(Permissions, _super);
    function Permissions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Permissions.OptionName = "permissions";
    return Permissions;
}(nested_option_1.default));
exports.Permissions = Permissions;
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.OptionName = "toolbar";
    Toolbar.ExpectedChildren = {
        fileSelectionItem: { optionName: "fileSelectionItems", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true },
        toolbarItem: { optionName: "items", isCollectionItem: true }
    };
    return Toolbar;
}(nested_option_1.default));
exports.Toolbar = Toolbar;
var ToolbarItem = /** @class */ (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItem.OptionName = "items";
    ToolbarItem.IsCollectionItem = true;
    ToolbarItem.TemplateProps = [{
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent",
            keyFn: "menuItemKeyFn"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return ToolbarItem;
}(nested_option_1.default));
exports.ToolbarItem = ToolbarItem;
var Upload = /** @class */ (function (_super) {
    __extends(Upload, _super);
    function Upload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Upload.OptionName = "upload";
    return Upload;
}(nested_option_1.default));
exports.Upload = Upload;
exports.default = FileManager;
