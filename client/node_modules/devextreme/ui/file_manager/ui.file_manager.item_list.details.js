/**
 * DevExtreme (ui/file_manager/ui.file_manager.item_list.details.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _uiFile_manager = require("./ui.file_manager.common");
var _type = require("../../core/utils/type");
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../data_grid/ui.data_grid"));
var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.item_list"));
var _uiFile_manager3 = _interopRequireDefault(require("./ui.file_manager.file_actions_button"));
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var FILE_MANAGER_DETAILS_ITEM_LIST_CLASS = "dx-filemanager-details";
var FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS = "dx-filemanager-details-item-thumbnail";
var FILE_MANAGER_DETAILS_ITEM_NAME_CLASS = "dx-filemanager-details-item-name";
var FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS = "dx-filemanager-details-item-name-wrapper";
var FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS = "dx-filemanager-details-item-is-directory";
var FILE_MANAGER_PARENT_DIRECTORY_ITEM = "dx-filemanager-parent-directory-item";
var DATA_GRID_DATA_ROW_CLASS = "dx-data-row";
var DEFAULT_COLUMN_CONFIGS = {
    thumbnail: {
        caption: "",
        calculateSortValue: "isDirectory",
        width: 36,
        alignment: "center",
        cssClass: FILE_MANAGER_DETAILS_ITEM_IS_DIRECTORY_CLASS
    },
    name: {
        caption: _message.default.format("dxFileManager-listDetailsColumnCaptionName")
    },
    dateModified: {
        caption: _message.default.format("dxFileManager-listDetailsColumnCaptionDateModified"),
        width: 110,
        hidingPriority: 1
    },
    size: {
        caption: _message.default.format("dxFileManager-listDetailsColumnCaptionFileSize"),
        width: 90,
        alignment: "right",
        hidingPriority: 0
    },
    isParentFolder: {
        caption: "isParentFolder",
        visible: false,
        sortIndex: 0,
        sortOrder: "asc"
    }
};
var FileManagerDetailsItemList = function(_FileManagerItemListB) {
    _inheritsLoose(FileManagerDetailsItemList, _FileManagerItemListB);

    function FileManagerDetailsItemList() {
        return _FileManagerItemListB.apply(this, arguments) || this
    }
    var _proto = FileManagerDetailsItemList.prototype;
    _proto._initMarkup = function() {
        var _this = this;
        this._itemCount = 0;
        this._focusedItem = null;
        this._hasParentDirectoryItem = false;
        this._parentDirectoryItemKey = null;
        this._selectAllCheckBox = null;
        this._selectAllCheckBoxUpdating = false;
        this.$element().addClass(FILE_MANAGER_DETAILS_ITEM_LIST_CLASS);
        this._createFilesView();
        this._contextMenu.option("onContextMenuHidden", function() {
            return _this._onContextMenuHidden()
        });
        _FileManagerItemListB.prototype._initMarkup.call(this)
    };
    _proto._createFilesView = function() {
        var _this2 = this;
        var $filesView = (0, _renderer.default)("<div>").appendTo(this.$element());
        var selectionMode = this._isMultipleSelectionMode() ? "multiple" : "none";
        this._filesView = this._createComponent($filesView, _ui.default, {
            dataSource: this._createDataSource(),
            hoverStateEnabled: true,
            selection: {
                mode: selectionMode,
                showCheckBoxesMode: this._isDesktop() ? "onClick" : "none"
            },
            selectedRowKeys: this.option("selectedItemKeys"),
            focusedRowKey: this.option("focusedItemKey"),
            focusedRowEnabled: true,
            allowColumnResizing: true,
            scrolling: {
                mode: "virtual"
            },
            sorting: {
                mode: "single",
                showSortIndexes: false
            },
            showColumnLines: false,
            showRowLines: false,
            columnHidingEnabled: false,
            columns: this._createColumns(),
            onEditorPreparing: this._onEditorPreparing.bind(this),
            onRowPrepared: this._onRowPrepared.bind(this),
            onContextMenuPreparing: this._onContextMenuPreparing.bind(this),
            onSelectionChanged: this._onFilesViewSelectionChanged.bind(this),
            onFocusedRowChanged: this._onFilesViewFocusedRowChanged.bind(this),
            onOptionChanged: this._onFilesViewOptionChanged.bind(this),
            onContentReady: function() {
                var _this2$_refreshDeferr;
                return null === (_this2$_refreshDeferr = _this2._refreshDeferred) || void 0 === _this2$_refreshDeferr ? void 0 : _this2$_refreshDeferr.resolve()
            }
        })
    };
    _proto._createColumns = function() {
        var _this3 = this;
        var columns = this.option("detailColumns");
        columns = columns.slice(0);
        columns = columns.map(function(column) {
            var extendedItem = column;
            if ((0, _type.isString)(column)) {
                extendedItem = {
                    dataField: column
                }
            }
            return _this3._getPreparedColumn(extendedItem)
        });
        var customizeDetailColumns = this.option("customizeDetailColumns");
        if ((0, _type.isFunction)(customizeDetailColumns)) {
            columns = customizeDetailColumns(columns)
        }
        columns.push(this._getPreparedColumn({
            dataField: "isParentFolder"
        }));
        columns.forEach(function(column) {
            return _this3._updateColumnDataField(column)
        });
        return columns
    };
    _proto._getPreparedColumn = function(columnOptions) {
        var result = {};
        var resultCssClass = "";
        if (this._isDefaultColumn(columnOptions.dataField)) {
            var defaultConfig = (0, _extend.extend)(true, {}, DEFAULT_COLUMN_CONFIGS[columnOptions.dataField]);
            resultCssClass = defaultConfig.cssClass || "";
            switch (columnOptions.dataField) {
                case "thumbnail":
                    defaultConfig.cellTemplate = this._createThumbnailColumnCell.bind(this);
                    defaultConfig.calculateSortValue = "fileItem.".concat(defaultConfig.calculateSortValue);
                    break;
                case "name":
                    defaultConfig.cellTemplate = this._createNameColumnCell.bind(this);
                    defaultConfig.caption = _message.default.format("dxFileManager-listDetailsColumnCaptionName");
                    break;
                case "size":
                    defaultConfig.calculateCellValue = this._calculateSizeColumnCellValue.bind(this);
                    defaultConfig.caption = _message.default.format("dxFileManager-listDetailsColumnCaptionFileSize");
                    defaultConfig.calculateSortValue = function(rowData) {
                        return rowData.fileItem.isDirectory ? -1 : rowData.fileItem.size
                    };
                    break;
                case "dateModified":
                    defaultConfig.caption = _message.default.format("dxFileManager-listDetailsColumnCaptionDateModified")
            }(0, _extend.extend)(true, result, defaultConfig)
        }(0, _uiFile_manager.extendAttributes)(result, columnOptions, ["alignment", "caption", "dataField", "dataType", "hidingPriority", "sortIndex", "sortOrder", "visible", "visibleIndex", "width"]);
        if (columnOptions.cssClass) {
            resultCssClass = "".concat(resultCssClass, " ").concat(columnOptions.cssClass)
        }
        if (resultCssClass) {
            result.cssClass = resultCssClass
        }
        return result
    };
    _proto._updateColumnDataField = function(column) {
        var dataItemSuffix = this._isDefaultColumn(column.dataField) ? "" : "dataItem.";
        column.dataField = "fileItem." + dataItemSuffix + column.dataField;
        return column
    };
    _proto._isDefaultColumn = function(columnDataField) {
        return !!DEFAULT_COLUMN_CONFIGS[columnDataField]
    };
    _proto._onFileItemActionButtonClick = function(_ref) {
        var component = _ref.component,
            element = _ref.element,
            event = _ref.event;
        event.stopPropagation();
        var $row = component.$element().closest(this._getItemSelector());
        var fileItemInfo = $row.data("item");
        this._selectItem(fileItemInfo);
        this._showContextMenu(this._getFileItemsForContextMenu(fileItemInfo), element, fileItemInfo);
        this._activeFileActionsButton = component;
        this._activeFileActionsButton.setActive(true)
    };
    _proto._onContextMenuHidden = function() {
        if (this._activeFileActionsButton) {
            this._activeFileActionsButton.setActive(false)
        }
    };
    _proto._getItemThumbnailCssClass = function() {
        return FILE_MANAGER_DETAILS_ITEM_THUMBNAIL_CLASS
    };
    _proto._getItemSelector = function() {
        return ".".concat(DATA_GRID_DATA_ROW_CLASS)
    };
    _proto._onItemDblClick = function(e) {
        var $row = (0, _renderer.default)(e.currentTarget);
        var fileItemInfo = $row.data("item");
        this._raiseSelectedItemOpened(fileItemInfo)
    };
    _proto._isAllItemsSelected = function() {
        var selectableItemsCount = this._hasParentDirectoryItem ? this._itemCount - 1 : this._itemCount;
        var selectedRowKeys = this._filesView.option("selectedRowKeys");
        if (!selectedRowKeys.length) {
            return false
        }
        return selectedRowKeys.length >= selectableItemsCount ? true : void 0
    };
    _proto._onEditorPreparing = function(_ref2) {
        var _this4 = this;
        var component = _ref2.component,
            command = _ref2.command,
            row = _ref2.row,
            parentType = _ref2.parentType,
            editorOptions = _ref2.editorOptions;
        if (!this._filesView) {
            this._filesView = component
        }
        if ("select" === command && row) {
            if (this._isParentDirectoryItem(row.data)) {
                editorOptions.disabled = true
            }
        } else {
            if ("headerRow" === parentType) {
                editorOptions.onInitialized = function(_ref3) {
                    var component = _ref3.component;
                    _this4._selectAllCheckBox = component
                };
                editorOptions.value = this._isAllItemsSelected();
                editorOptions.onValueChanged = function(args) {
                    return _this4._onSelectAllCheckBoxValueChanged(args)
                }
            }
        }
    };
    _proto._onSelectAllCheckBoxValueChanged = function(_ref4) {
        var event = _ref4.event,
            previousValue = _ref4.previousValue,
            value = _ref4.value;
        if (!event) {
            if (previousValue && !this._selectAllCheckBoxUpdating && this._selectAllCheckBox) {
                this._selectAllCheckBox.option("value", previousValue)
            }
            return
        }
        if (this._isAllItemsSelected() === value) {
            return
        }
        if (value) {
            this._filesView.selectAll()
        } else {
            this._filesView.deselectAll()
        }
        event.preventDefault()
    };
    _proto._onRowPrepared = function(_ref5) {
        var rowType = _ref5.rowType,
            rowElement = _ref5.rowElement,
            data = _ref5.data;
        if ("data" === rowType) {
            var $row = (0, _renderer.default)(rowElement);
            $row.data("item", data);
            if (this._isParentDirectoryItem(data)) {
                $row.addClass(FILE_MANAGER_PARENT_DIRECTORY_ITEM)
            }
        }
    };
    _proto._onContextMenuPreparing = function(e) {
        if (!this._isDesktop()) {
            return
        }
        var fileItems = null;
        var item = null;
        if (e.row && "data" === e.row.rowType) {
            item = e.row.data;
            this._selectItem(item);
            fileItems = this._getFileItemsForContextMenu(item)
        }
        e.items = this._contextMenu.createContextMenuItems(fileItems, null, item);
        this._raiseContextMenuShowing()
    };
    _proto._onFilesViewSelectionChanged = function(_ref6) {
        var component = _ref6.component,
            selectedRowsData = _ref6.selectedRowsData,
            selectedRowKeys = _ref6.selectedRowKeys,
            currentSelectedRowKeys = _ref6.currentSelectedRowKeys,
            currentDeselectedRowKeys = _ref6.currentDeselectedRowKeys;
        this._filesView = this._filesView || component;
        if (this._selectAllCheckBox) {
            this._selectAllCheckBoxUpdating = true;
            this._selectAllCheckBox.option("value", this._isAllItemsSelected());
            this._selectAllCheckBoxUpdating = false
        }
        var selectedItems = selectedRowsData.map(function(itemInfo) {
            return itemInfo.fileItem
        });
        this._tryRaiseSelectionChanged({
            selectedItemInfos: selectedRowsData,
            selectedItems: selectedItems,
            selectedItemKeys: selectedRowKeys,
            currentSelectedItemKeys: currentSelectedRowKeys,
            currentDeselectedItemKeys: currentDeselectedRowKeys
        })
    };
    _proto._onFilesViewFocusedRowChanged = function(e) {
        var _e$row2;
        if (!this._isMultipleSelectionMode()) {
            var _e$row;
            this._selectItemSingleSelection(null === (_e$row = e.row) || void 0 === _e$row ? void 0 : _e$row.data)
        }
        var fileSystemItem = (null === (_e$row2 = e.row) || void 0 === _e$row2 ? void 0 : _e$row2.data.fileItem) || null;
        this._onFocusedItemChanged({
            item: fileSystemItem,
            itemKey: null === fileSystemItem || void 0 === fileSystemItem ? void 0 : fileSystemItem.key,
            itemElement: e.rowElement
        })
    };
    _proto._onFilesViewOptionChanged = function(_ref7) {
        var fullName = _ref7.fullName;
        if (fullName.indexOf("sortOrder") > -1) {
            this._filesView.columnOption("isParentFolder", {
                sortOrder: "asc",
                sortIndex: 0
            })
        }
    };
    _proto._createThumbnailColumnCell = function(container, cellInfo) {
        this._getItemThumbnailContainer(cellInfo.data).appendTo(container)
    };
    _proto._createNameColumnCell = function(container, cellInfo) {
        var _this5 = this;
        var $button = (0, _renderer.default)("<div>");
        var $name = (0, _renderer.default)("<span>").text(cellInfo.data.fileItem.name).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_CLASS);
        var $wrapper = (0, _renderer.default)("<div>").append($name, $button).addClass(FILE_MANAGER_DETAILS_ITEM_NAME_WRAPPER_CLASS);
        (0, _renderer.default)(container).append($wrapper);
        this._createComponent($button, _uiFile_manager3.default, {
            onClick: function(e) {
                return _this5._onFileItemActionButtonClick(e)
            }
        })
    };
    _proto._calculateSizeColumnCellValue = function(rowData) {
        return rowData.fileItem.isDirectory ? "" : (0, _uiFile_manager.getDisplayFileSize)(rowData.fileItem.size)
    };
    _proto._selectItem = function(fileItemInfo) {
        var selectItemFunc = this._isMultipleSelectionMode() ? this._selectItemMultipleSelection : this._selectItemSingleSelection;
        selectItemFunc.call(this, fileItemInfo)
    };
    _proto._deselectItem = function(item) {
        this._filesView.deselectRows([item.fileItem.key])
    };
    _proto._selectItemSingleSelection = function(fileItemInfo) {
        if (!this._focusedItem || !fileItemInfo || this._focusedItem.fileItem.key !== fileItemInfo.fileItem.key) {
            var oldFocusedItem = this._focusedItem;
            this._focusedItem = fileItemInfo;
            var deselectedKeys = [];
            if (oldFocusedItem) {
                deselectedKeys.push(oldFocusedItem.fileItem.key)
            }
            var selectedItems = [];
            var selectedKeys = [];
            if (fileItemInfo) {
                selectedItems.push(fileItemInfo.fileItem);
                selectedKeys.push(fileItemInfo.fileItem.key)
            }
            this._raiseSelectionChanged({
                selectedItems: selectedItems,
                selectedItemKeys: selectedKeys,
                currentSelectedItemKeys: [].concat(selectedKeys),
                currentDeselectedItemKeys: deselectedKeys
            })
        }
    };
    _proto._selectItemMultipleSelection = function(_ref8) {
        var fileItem = _ref8.fileItem;
        if (!this._filesView.isRowSelected(fileItem.key)) {
            var selectionController = this._filesView.getController("selection");
            var preserve = selectionController.isSelectionWithCheckboxes();
            this._filesView.selectRows([fileItem.key], preserve)
        }
    };
    _proto._setSelectedItemKeys = function(itemKeys) {
        this._filesView.option("selectedRowKeys", itemKeys)
    };
    _proto._setFocusedItemKey = function(itemKey) {
        this._filesView.option("focusedRowKey", itemKey)
    };
    _proto.clearSelection = function() {
        if (this._isMultipleSelectionMode()) {
            this._filesView.clearSelection()
        } else {
            this._filesView.option("focusedRowIndex", -1)
        }
    };
    _proto.refresh = function(options) {
        var actualOptions = {
            dataSource: this._createDataSource()
        };
        if (options && Object.prototype.hasOwnProperty.call(options, "focusedItemKey")) {
            if ((0, _type.isDefined)(options.focusedItemKey)) {
                actualOptions.focusedRowKey = options.focusedItemKey
            } else {
                actualOptions.focusedRowIndex = -1
            }
        }
        this._filesView.option(actualOptions);
        this._refreshDeferred = new _deferred.Deferred;
        return this._refreshDeferred.promise()
    };
    _proto.getSelectedItems = function() {
        if (this._isMultipleSelectionMode()) {
            return this._filesView.getSelectedRowsData()
        }
        return this._focusedItem && !this._isParentDirectoryItem(this._focusedItem) ? [this._focusedItem] : []
    };
    return FileManagerDetailsItemList
}(_uiFile_manager2.default);
var _default = FileManagerDetailsItemList;
exports.default = _default;
module.exports = exports.default;
