/**
 * DevExtreme (ui/file_manager/ui.file_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");
var _common = require("../../core/utils/common");
var _message = _interopRequireDefault(require("../../localization/message"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _notify = _interopRequireDefault(require("../notify"));
var _uiFile_manager = require("./ui.file_manager.common");
var _file_items_controller = _interopRequireDefault(require("./file_items_controller"));
var _uiFile_manager2 = require("./ui.file_manager.command_manager");
var _uiFile_manager3 = _interopRequireDefault(require("./ui.file_manager.context_menu"));
var _uiFile_manager4 = _interopRequireDefault(require("./ui.file_manager.files_tree_view"));
var _uiFile_managerItem_list = _interopRequireDefault(require("./ui.file_manager.item_list.details"));
var _uiFile_managerItem_list2 = _interopRequireDefault(require("./ui.file_manager.item_list.thumbnails"));
var _uiFile_manager5 = _interopRequireDefault(require("./ui.file_manager.toolbar"));
var _uiFile_manager6 = _interopRequireDefault(require("./ui.file_manager.notification"));
var _uiFile_manager7 = _interopRequireDefault(require("./ui.file_manager.editing"));
var _uiFile_manager8 = _interopRequireDefault(require("./ui.file_manager.breadcrumbs"));
var _uiFile_manager9 = _interopRequireDefault(require("./ui.file_manager.adaptivity"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var FILE_MANAGER_CLASS = "dx-filemanager";
var FILE_MANAGER_WRAPPER_CLASS = FILE_MANAGER_CLASS + "-wrapper";
var FILE_MANAGER_CONTAINER_CLASS = FILE_MANAGER_CLASS + "-container";
var FILE_MANAGER_DIRS_PANEL_CLASS = FILE_MANAGER_CLASS + "-dirs-panel";
var FILE_MANAGER_INACTIVE_AREA_CLASS = FILE_MANAGER_CLASS + "-inactive-area";
var FILE_MANAGER_EDITING_CONTAINER_CLASS = FILE_MANAGER_CLASS + "-editing-container";
var FILE_MANAGER_ITEMS_PANEL_CLASS = FILE_MANAGER_CLASS + "-items-panel";
var FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS = FILE_MANAGER_CLASS + "-item-custom-thumbnail";
var PARENT_DIRECTORY_KEY_PREFIX = "[*DXPDK*]$40F96F03-FBD8-43DF-91BE-F55F4B8BA871$";
var VIEW_AREAS = {
    folders: "navPane",
    items: "itemView"
};
var FileManager = function(_Widget) {
    _inheritsLoose(FileManager, _Widget);

    function FileManager() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = FileManager.prototype;
    _proto._initTemplates = function() {};
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this._initActions();
        this._firstItemViewLoad = true;
        this._lockSelectionProcessing = false;
        this._lockFocusedItemProcessing = false;
        this._itemKeyToFocus = void 0;
        this._controller = new _file_items_controller.default({
            currentPath: this.option("currentPath"),
            currentPathKeys: this.option("currentPathKeys"),
            rootText: this.option("rootFolderName"),
            fileProvider: this.option("fileSystemProvider"),
            allowedFileExtensions: this.option("allowedFileExtensions"),
            uploadMaxFileSize: this.option("upload").maxFileSize,
            uploadChunkSize: this.option("upload").chunkSize,
            onInitialized: this._onControllerInitialized.bind(this),
            onDataLoading: this._onDataLoading.bind(this),
            onSelectedDirectoryChanged: this._onSelectedDirectoryChanged.bind(this)
        });
        this._commandManager = new _uiFile_manager2.FileManagerCommandManager(this.option("permissions"));
        this.$element().addClass(FILE_MANAGER_CLASS);
        this._createNotificationControl();
        this._initCommandManager();
        this._setItemsViewAreaActive(false)
    };
    _proto._createNotificationControl = function() {
        var _this = this;
        var $notificationControl = (0, _renderer.default)("<div>").addClass("dx-filemanager-notification-container").appendTo(this.$element());
        this._notificationControl = this._createComponent($notificationControl, _uiFile_manager6.default, {
            progressPanelContainer: this.$element(),
            contentTemplate: function(container) {
                return _this._createWrapper(container)
            },
            onActionProgress: function(e) {
                return _this._onActionProgress(e)
            },
            positionTarget: ".".concat(FILE_MANAGER_CONTAINER_CLASS)
        });
        this._editing.option("notificationControl", this._notificationControl)
    };
    _proto._createWrapper = function(container) {
        var _this2 = this;
        this._$wrapper = (0, _renderer.default)("<div>").addClass(FILE_MANAGER_WRAPPER_CLASS).appendTo(container);
        this._createEditing();
        var $toolbar = (0, _renderer.default)("<div>").appendTo(this._$wrapper);
        this._toolbar = this._createComponent($toolbar, _uiFile_manager5.default, {
            commandManager: this._commandManager,
            generalItems: this.option("toolbar.items"),
            fileItems: this.option("toolbar.fileSelectionItems"),
            itemViewMode: this.option("itemView").mode,
            onItemClick: function(args) {
                return _this2._actions.onToolbarItemClick(args)
            }
        });
        this._createAdaptivityControl()
    };
    _proto._createAdaptivityControl = function() {
        var _this3 = this;
        var $container = (0, _renderer.default)("<div>").addClass(FILE_MANAGER_CONTAINER_CLASS).appendTo(this._$wrapper);
        this._adaptivityControl = this._createComponent($container, _uiFile_manager9.default, {
            drawerTemplate: function(container) {
                return _this3._createFilesTreeView(container)
            },
            contentTemplate: function(container) {
                return _this3._createItemsPanel(container)
            },
            onAdaptiveStateChanged: function(e) {
                return _this3._onAdaptiveStateChanged(e)
            }
        })
    };
    _proto._createEditing = function() {
        var _this4 = this;
        var $editingContainer = (0, _renderer.default)("<div>").addClass(FILE_MANAGER_EDITING_CONTAINER_CLASS).appendTo(this.$element());
        this._editing = this._createComponent($editingContainer, _uiFile_manager7.default, {
            controller: this._controller,
            model: {
                getMultipleSelectedItems: this._getMultipleSelectedItems.bind(this)
            },
            getItemThumbnail: this._getItemThumbnailInfo.bind(this),
            uploadDropZonePlaceholderContainer: this.$element(),
            onSuccess: function(_ref) {
                var updatedOnlyFiles = _ref.updatedOnlyFiles;
                return _this4._redrawComponent(updatedOnlyFiles)
            },
            onCreating: function() {
                return _this4._setItemsViewAreaActive(false)
            },
            onError: function(e) {
                return _this4._onEditingError(e)
            }
        })
    };
    _proto._createItemsPanel = function($container) {
        this._$itemsPanel = (0, _renderer.default)("<div>").addClass(FILE_MANAGER_ITEMS_PANEL_CLASS).appendTo($container);
        this._createBreadcrumbs(this._$itemsPanel);
        this._createItemView(this._$itemsPanel);
        if (this._commandManager.isCommandAvailable("upload")) {
            this._editing.setUploaderDropZone(this._$itemsPanel)
        }
    };
    _proto._createFilesTreeView = function(container) {
        var _this5 = this;
        this._filesTreeViewContextMenu = this._createContextMenu(false, VIEW_AREAS.folders);
        var $filesTreeView = (0, _renderer.default)("<div>").addClass(FILE_MANAGER_DIRS_PANEL_CLASS).appendTo(container);
        this._filesTreeView = this._createComponent($filesTreeView, _uiFile_manager4.default, {
            storeExpandedState: true,
            contextMenu: this._filesTreeViewContextMenu,
            getDirectories: this.getDirectories.bind(this),
            getCurrentDirectory: this._getCurrentDirectory.bind(this),
            onDirectoryClick: this._onFilesTreeViewDirectoryClick.bind(this),
            onClick: function() {
                return _this5._setItemsViewAreaActive(false)
            }
        });
        this._filesTreeView.updateCurrentDirectory()
    };
    _proto._createItemView = function($container, viewMode) {
        var _this6 = this;
        this._itemViewContextMenu = this._createContextMenu(true, VIEW_AREAS.items);
        var itemViewOptions = this.option("itemView");
        var options = {
            selectionMode: this.option("selectionMode"),
            selectedItemKeys: this.option("selectedItemKeys"),
            focusedItemKey: this.option("focusedItemKey"),
            contextMenu: this._itemViewContextMenu,
            getItems: this._getItemViewItems.bind(this),
            onError: function(_ref2) {
                var error = _ref2.error;
                return _this6._showError(error)
            },
            onSelectionChanged: this._onItemViewSelectionChanged.bind(this),
            onFocusedItemChanged: this._onItemViewFocusedItemChanged.bind(this),
            onSelectedItemOpened: this._onSelectedItemOpened.bind(this),
            onContextMenuShowing: function() {
                return _this6._onContextMenuShowing(VIEW_AREAS.items)
            },
            getItemThumbnail: this._getItemThumbnailInfo.bind(this),
            customizeDetailColumns: this.option("customizeDetailColumns"),
            detailColumns: this.option("itemView.details.columns")
        };
        var $itemView = (0, _renderer.default)("<div>").appendTo($container);
        viewMode = viewMode || itemViewOptions.mode;
        var widgetClass = "thumbnails" === viewMode ? _uiFile_managerItem_list2.default : _uiFile_managerItem_list.default;
        this._itemView = this._createComponent($itemView, widgetClass, options);
        _events_engine.default.on($itemView, "click", this._onItemViewClick.bind(this))
    };
    _proto._createBreadcrumbs = function($container) {
        var _this7 = this;
        var $breadcrumbs = (0, _renderer.default)("<div>").appendTo($container);
        this._breadcrumbs = this._createComponent($breadcrumbs, _uiFile_manager8.default, {
            rootFolderDisplayName: this.option("rootFolderName"),
            onCurrentDirectoryChanging: function(_ref3) {
                var currentDirectory = _ref3.currentDirectory;
                return _this7._setCurrentDirectory(currentDirectory)
            }
        });
        this._breadcrumbs.setCurrentDirectory(this._getCurrentDirectory())
    };
    _proto._createContextMenu = function(isolateCreationItemCommands, viewArea) {
        var _this8 = this;
        var $contextMenu = (0, _renderer.default)("<div>").appendTo(this._$wrapper);
        return this._createComponent($contextMenu, _uiFile_manager3.default, {
            commandManager: this._commandManager,
            items: this.option("contextMenu.items"),
            onItemClick: function(args) {
                return _this8._actions.onContextMenuItemClick(args)
            },
            onContextMenuShowing: function() {
                return _this8._onContextMenuShowing(viewArea)
            },
            isolateCreationItemCommands: isolateCreationItemCommands,
            viewArea: viewArea
        })
    };
    _proto._initCommandManager = function() {
        var _this9 = this;
        var actions = (0, _extend.extend)(this._editing.getCommandActions(), {
            refresh: function() {
                return _this9._refreshAndShowProgress()
            },
            thumbnails: function() {
                return _this9.option("itemView.mode", "thumbnails")
            },
            details: function() {
                return _this9.option("itemView.mode", "details")
            },
            clearSelection: function() {
                return _this9._clearSelection()
            },
            showNavPane: function() {
                return _this9._adaptivityControl.toggleDrawer()
            }
        });
        this._commandManager.registerActions(actions)
    };
    _proto._onFilesTreeViewDirectoryClick = function(_ref4) {
        var itemData = _ref4.itemData;
        this._setCurrentDirectory(itemData);
        this._setItemsViewAreaActive(false)
    };
    _proto._onItemViewSelectionChanged = function(_ref5) {
        var selectedItemInfos = _ref5.selectedItemInfos,
            selectedItems = _ref5.selectedItems,
            selectedItemKeys = _ref5.selectedItemKeys,
            currentSelectedItemKeys = _ref5.currentSelectedItemKeys,
            currentDeselectedItemKeys = _ref5.currentDeselectedItemKeys;
        this._lockSelectionProcessing = true;
        this.option("selectedItemKeys", selectedItemKeys);
        this._lockSelectionProcessing = false;
        this._actions.onSelectionChanged({
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            currentSelectedItemKeys: currentSelectedItemKeys,
            currentDeselectedItemKeys: currentDeselectedItemKeys
        });
        this._updateToolbar(selectedItemInfos);
        this._setItemsViewAreaActive(true)
    };
    _proto._onItemViewFocusedItemChanged = function(e) {
        this._lockFocusedItemProcessing = true;
        this.option("focusedItemKey", e.itemKey);
        this._lockFocusedItemProcessing = false;
        this._actions.onFocusedItemChanged({
            item: e.item,
            itemElement: e.itemElement
        })
    };
    _proto._onAdaptiveStateChanged = function(_ref6) {
        var enabled = _ref6.enabled;
        this._commandManager.setCommandEnabled("showNavPane", enabled);
        this._updateToolbar()
    };
    _proto._onActionProgress = function(_ref7) {
        var message = _ref7.message,
            status = _ref7.status;
        this._toolbar.updateRefreshItem(message, status);
        this._updateToolbar()
    };
    _proto._onEditingError = function(e) {
        var args = (0, _uiFile_manager.extendAttributes)({}, e, ["errorCode", "errorText", "fileSystemItem"]);
        this._actions.onErrorOccurred(args);
        e.errorText = args.errorText
    };
    _proto._refreshAndShowProgress = function() {
        var _this10 = this;
        return (0, _deferred.when)(this._notificationControl.tryShowProgressPanel(), this._controller.refresh()).then(function() {
            return _this10._filesTreeView.refresh()
        })
    };
    _proto._updateToolbar = function(selectedItems) {
        var items = selectedItems || this._getSelectedItemInfos();
        this._toolbar.update(items)
    };
    _proto._setItemsViewAreaActive = function(active) {
        if (this._itemsViewAreaActive === active) {
            return
        }
        this._itemsViewAreaActive = active;
        var $activeArea = null;
        var $inactiveArea = null;
        if (active) {
            $activeArea = this._itemView.$element();
            $inactiveArea = this._filesTreeView.$element()
        } else {
            $activeArea = this._filesTreeView.$element();
            $inactiveArea = this._itemView.$element()
        }
        $activeArea.removeClass(FILE_MANAGER_INACTIVE_AREA_CLASS);
        $inactiveArea.addClass(FILE_MANAGER_INACTIVE_AREA_CLASS)
    };
    _proto._switchView = function(viewMode) {
        this._disposeWidget(this._itemView.option("contextMenu"));
        this._disposeWidget(this._itemView);
        this._createItemView(this._$itemsPanel, viewMode);
        this._toolbar.option({
            itemViewMode: viewMode
        })
    };
    _proto._disposeWidget = function(widget) {
        widget.dispose();
        widget.$element().remove()
    };
    _proto._clearSelection = function() {
        this._itemView.clearSelection()
    };
    _proto._getMultipleSelectedItems = function() {
        return this._itemsViewAreaActive ? this._getSelectedItemInfos() : [this._getCurrentDirectory()]
    };
    _proto._showError = function(message) {
        this._showNotification(message, false)
    };
    _proto._showNotification = function(message, isSuccess) {
        (0, _notify.default)({
            message: message,
            width: 450
        }, isSuccess ? "success" : "error", 5e3)
    };
    _proto._redrawComponent = function(onlyFileItemsView) {
        var _this11 = this;
        this._itemView.refresh().then(function() {
            return !onlyFileItemsView && _this11._filesTreeView.refresh()
        })
    };
    _proto._getItemViewItems = function() {
        var _this12 = this;
        var showFolders = this.option("itemView").showFolders;
        var result = this._controller.getCurrentItems(!showFolders);
        this._updateToolbarWithSelectionOnFirstLoad(result);
        if (this.option("itemView.showParentFolder")) {
            result = (0, _deferred.when)(result).then(function(items) {
                return _this12._getPreparedItemViewItems(items)
            })
        }
        return result
    };
    _proto._updateToolbarWithSelectionOnFirstLoad = function(itemsResult) {
        var _this13 = this;
        if (!this._firstItemViewLoad) {
            return
        }
        this._firstItemViewLoad = false;
        var selectedItemKeys = this.option("selectedItemKeys");
        if (selectedItemKeys.length > 0) {
            (0, _deferred.when)(itemsResult).done(function(items) {
                var selectedItems = (0, _uiFile_manager.findItemsByKeys)(items, selectedItemKeys);
                if (selectedItems.length > 0) {
                    _this13._updateToolbar(selectedItems)
                }
            })
        }
    };
    _proto._getPreparedItemViewItems = function(items) {
        var selectedDir = this._getCurrentDirectory();
        if (selectedDir.fileItem.isRoot()) {
            return items
        }
        var parentDirItem = selectedDir.fileItem.createClone();
        parentDirItem.isParentFolder = true;
        parentDirItem.name = "..";
        parentDirItem.relativeName = "..";
        parentDirItem.key = "".concat(PARENT_DIRECTORY_KEY_PREFIX).concat(selectedDir.fileItem.key);
        var itemsCopy = _toConsumableArray(items);
        itemsCopy.unshift({
            fileItem: parentDirItem,
            icon: "parentfolder"
        });
        return itemsCopy
    };
    _proto._onItemViewClick = function() {
        this._setItemsViewAreaActive(true)
    };
    _proto._onContextMenuShowing = function(viewArea) {
        this._setItemsViewAreaActive(viewArea === VIEW_AREAS.items)
    };
    _proto._getItemThumbnailInfo = function(fileInfo) {
        var func = this.option("customizeThumbnail");
        var thumbnail = (0, _type.isFunction)(func) ? func(fileInfo.fileItem) : fileInfo.fileItem.thumbnail;
        if (thumbnail) {
            return {
                thumbnail: thumbnail,
                cssClass: FILE_MANAGER_ITEM_CUSTOM_THUMBNAIL_CLASS
            }
        }
        return {
            thumbnail: fileInfo.icon
        }
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            fileSystemProvider: null,
            currentPath: "",
            currentPathKeys: [],
            rootFolderName: _message.default.format("dxFileManager-rootDirectoryName"),
            selectionMode: "multiple",
            selectedItemKeys: [],
            focusedItemKey: void 0,
            toolbar: {
                items: ["showNavPane", "create", "upload", "switchView", {
                    name: "separator",
                    location: "after"
                }, "refresh"],
                fileSelectionItems: ["download", "separator", "move", "copy", "rename", "separator", "delete", "clearSelection", {
                    name: "separator",
                    location: "after"
                }, "refresh"]
            },
            contextMenu: {
                items: ["create", "upload", "rename", "move", "copy", "delete", "refresh", "download"]
            },
            itemView: {
                details: {
                    columns: ["thumbnail", "name", "dateModified", "size"]
                },
                mode: "details",
                showFolders: true,
                showParentFolder: true
            },
            customizeThumbnail: null,
            customizeDetailColumns: null,
            onContextMenuItemClick: null,
            onCurrentDirectoryChanged: null,
            onSelectedFileOpened: null,
            onSelectionChanged: null,
            onFocusedItemChanged: null,
            onToolbarItemClick: null,
            onErrorOccurred: null,
            allowedFileExtensions: [],
            upload: {
                maxFileSize: 0,
                chunkSize: 2e5
            },
            permissions: {
                create: false,
                copy: false,
                move: false,
                "delete": false,
                rename: false,
                upload: false,
                download: false
            }
        })
    };
    _proto._optionChanged = function(args) {
        var name = args.name;
        switch (name) {
            case "currentPath":
                this._controller.setCurrentPath(args.value);
                break;
            case "currentPathKeys":
                this._controller.setCurrentPathByKeys(args.value);
                break;
            case "selectedItemKeys":
                if (!this._lockSelectionProcessing && this._itemView) {
                    this._itemView.option("selectedItemKeys", args.value)
                }
                break;
            case "focusedItemKey":
                if (!this._lockFocusedItemProcessing && this._itemView) {
                    this._itemView.option("focusedItemKey", args.value)
                }
                break;
            case "fileSystemProvider":
            case "selectionMode":
            case "customizeThumbnail":
            case "customizeDetailColumns":
            case "rootFolderName":
            case "allowedFileExtensions":
            case "permissions":
            case "upload":
                this.repaint();
                break;
            case "itemView":
                if ("itemView.mode" === args.fullName) {
                    this._switchView(args.value)
                } else {
                    this.repaint()
                }
                break;
            case "toolbar":
                var toolbarOptions = {};
                if ("toolbar" === args.fullName) {
                    if (args.value.items) {
                        toolbarOptions.generalItems = args.value.items
                    }
                    if (args.value.fileSelectionItems) {
                        toolbarOptions.fileItems = args.value.fileSelectionItems
                    }
                }
                if (0 === args.fullName.indexOf("toolbar.items")) {
                    toolbarOptions.generalItems = this.option("toolbar.items")
                }
                if (0 === args.fullName.indexOf("toolbar.fileSelectionItems")) {
                    toolbarOptions.fileItems = this.option("toolbar.fileSelectionItems")
                }
                this._toolbar.option(toolbarOptions);
                break;
            case "contextMenu":
                if ("contextMenu" === args.fullName && args.value.items || 0 === args.fullName.indexOf("contextMenu.items")) {
                    var contextMenuItems = this.option("contextMenu.items");
                    this._filesTreeViewContextMenu.option("items", contextMenuItems);
                    this._itemViewContextMenu.option("items", contextMenuItems)
                }
                break;
            case "onContextMenuItemClick":
            case "onCurrentDirectoryChanged":
            case "onSelectedFileOpened":
            case "onSelectionChanged":
            case "onFocusedItemChanged":
            case "onToolbarItemClick":
            case "onErrorOccurred":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto._initActions = function() {
        this._actions = {
            onContextMenuItemClick: this._createActionByOption("onContextMenuItemClick"),
            onCurrentDirectoryChanged: this._createActionByOption("onCurrentDirectoryChanged"),
            onSelectedFileOpened: this._createActionByOption("onSelectedFileOpened"),
            onSelectionChanged: this._createActionByOption("onSelectionChanged"),
            onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged"),
            onToolbarItemClick: this._createActionByOption("onToolbarItemClick"),
            onErrorOccurred: this._createActionByOption("onErrorOccurred")
        }
    };
    _proto.executeCommand = function(commandName) {
        return this._commandManager.executeCommand(commandName)
    };
    _proto._setCurrentDirectory = function(directoryInfo) {
        this._controller.setCurrentDirectory(directoryInfo)
    };
    _proto._getCurrentDirectory = function() {
        return this._controller.getCurrentDirectory()
    };
    _proto._onControllerInitialized = function(_ref8) {
        var controller = _ref8.controller;
        this._controller = this._controller || controller;
        var currentDirectory = controller.getCurrentDirectory();
        if (!currentDirectory.fileItem.isRoot()) {
            this._syncToCurrentDirectory()
        }
    };
    _proto._onDataLoading = function(_ref9) {
        var operation = _ref9.operation;
        var options = null;
        if ("navigation" === operation) {
            options = {
                focusedItemKey: this._itemKeyToFocus
            };
            this._itemKeyToFocus = void 0
        }
        this._itemView.refresh(options)
    };
    _proto._onSelectedDirectoryChanged = function() {
        var currentDirectory = this._getCurrentDirectory();
        this._syncToCurrentDirectory();
        this._actions.onCurrentDirectoryChanged({
            directory: currentDirectory.fileItem
        })
    };
    _proto._syncToCurrentDirectory = function() {
        var currentDirectory = this._getCurrentDirectory();
        var currentPath = this._controller.getCurrentPath();
        var currentPathKeys = currentDirectory.fileItem.pathKeys;
        if (this._filesTreeView) {
            this._filesTreeView.updateCurrentDirectory()
        }
        if (this._breadcrumbs) {
            this._breadcrumbs.setCurrentDirectory(currentDirectory)
        }
        var options = {
            currentPath: currentPath
        };
        if (!(0, _common.equalByValue)(this.option("currentPathKeys"), currentPathKeys)) {
            options.currentPathKeys = currentPathKeys
        }
        this.option(options)
    };
    _proto.getDirectories = function(parentDirectoryInfo, skipNavigationOnError) {
        return this._controller.getDirectories(parentDirectoryInfo, skipNavigationOnError)
    };
    _proto._getSelectedItemInfos = function() {
        return this._itemView.getSelectedItems()
    };
    _proto.refresh = function() {
        return this.executeCommand("refresh")
    };
    _proto.getCurrentDirectory = function() {
        var directoryInfo = this._getCurrentDirectory();
        return directoryInfo && directoryInfo.fileItem || null
    };
    _proto.getSelectedItems = function() {
        return this._getSelectedItemInfos().map(function(itemInfo) {
            return itemInfo.fileItem
        })
    };
    _proto._onSelectedItemOpened = function(_ref10) {
        var fileItemInfo = _ref10.fileItemInfo;
        var fileItem = fileItemInfo.fileItem;
        if (!fileItem.isDirectory) {
            this._actions.onSelectedFileOpened({
                file: fileItem
            });
            return
        }
        if (fileItem.isParentFolder) {
            this._itemKeyToFocus = this._getCurrentDirectory().fileItem.key
        }
        var newCurrentDirectory = fileItem.isParentFolder ? this._getCurrentDirectory().parentDirectory : fileItemInfo;
        this._setCurrentDirectory(newCurrentDirectory);
        if (newCurrentDirectory) {
            this._filesTreeView.toggleDirectoryExpandedState(newCurrentDirectory.parentDirectory, true)
        }
    };
    return FileManager
}(_ui.default);
(0, _component_registrator.default)("dxFileManager", FileManager);
var _default = FileManager;
exports.default = _default;
module.exports = exports.default;
