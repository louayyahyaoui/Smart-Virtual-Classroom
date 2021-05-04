/**
 * DevExtreme (ui/grid_core/ui.grid_core.column_chooser.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _uiGrid_core2 = require("./ui.grid_core.columns_view");
var _message = _interopRequireDefault(require("../../localization/message"));
var _themes = require("../themes");
var _button = _interopRequireDefault(require("../button"));
var _tree_view = _interopRequireDefault(require("../tree_view"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _popup = _interopRequireDefault(require("../popup"));
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COLUMN_CHOOSER_CLASS = "column-chooser";
var COLUMN_CHOOSER_BUTTON_CLASS = "column-chooser-button";
var NOTOUCH_ACTION_CLASS = "notouch-action";
var COLUMN_CHOOSER_LIST_CLASS = "column-chooser-list";
var COLUMN_CHOOSER_PLAIN_CLASS = "column-chooser-plain";
var COLUMN_CHOOSER_DRAG_CLASS = "column-chooser-mode-drag";
var COLUMN_CHOOSER_SELECT_CLASS = "column-chooser-mode-select";
var COLUMN_CHOOSER_ICON_NAME = "column-chooser";
var COLUMN_CHOOSER_ITEM_CLASS = "dx-column-chooser-item";
var TREEVIEW_NODE_SELECTOR = ".dx-treeview-node";
var CHECKBOX_SELECTOR = ".dx-checkbox";
var CLICK_TIMEOUT = 300;
var processItems = function(that, chooserColumns) {
    var items = [];
    var isSelectMode = "select" === that.option("columnChooser.mode");
    if (chooserColumns.length) {
        (0, _iterator.each)(chooserColumns, function(index, column) {
            var item = {
                text: column.caption,
                cssClass: column.cssClass,
                allowHiding: column.allowHiding,
                expanded: true,
                id: column.index,
                disabled: false,
                disableCheckBox: false === column.allowHiding,
                parentId: (0, _type.isDefined)(column.ownerBand) ? column.ownerBand : null
            };
            if (isSelectMode) {
                item.selected = column.visible
            }
            items.push(item)
        })
    }
    return items
};
var ColumnChooserController = _uiGrid_core.default.ViewController.inherit({
    renderShowColumnChooserButton: function($element) {
        var that = this;
        var columnChooserButtonClass = that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS);
        var columnChooserEnabled = that.option("columnChooser.enabled");
        var $showColumnChooserButton = $element.find("." + columnChooserButtonClass);
        var $columnChooserButton;
        if (columnChooserEnabled) {
            if (!$showColumnChooserButton.length) {
                $columnChooserButton = (0, _renderer.default)("<div>").addClass(columnChooserButtonClass).appendTo($element);
                that._createComponent($columnChooserButton, _button.default, {
                    icon: COLUMN_CHOOSER_ICON_NAME,
                    onClick: function() {
                        that.getView("columnChooserView").showColumnChooser()
                    },
                    hint: that.option("columnChooser.title"),
                    integrationOptions: {}
                })
            } else {
                $showColumnChooserButton.show()
            }
        } else {
            $showColumnChooserButton.hide()
        }
    },
    getPosition: function() {
        var rowsView = this.getView("rowsView");
        return {
            my: "right bottom",
            at: "right bottom",
            of: rowsView && rowsView.element(),
            collision: "fit",
            offset: "-2 -2",
            boundaryOffset: "2 2"
        }
    }
});
var ColumnChooserView = _uiGrid_core2.ColumnsView.inherit({
    _resizeCore: _common.noop,
    _isWinDevice: function() {
        return !!_devices.default.real().win
    },
    _updateList: function(change) {
        var items;
        var $popupContent = this._popupContainer.$content();
        var isSelectMode = "select" === this.option("columnChooser.mode");
        var columnChooserList = this._columnChooserList;
        var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
        if (isSelectMode && columnChooserList && change && "selection" === change.changeType) {
            items = processItems(this, chooserColumns);
            for (var i = 0; i < items.length; i++) {
                var selected = items[i].selected;
                var id = items[i].id;
                if (id === change.columnIndex) {
                    if (selected) {
                        columnChooserList.selectItem(id, selected)
                    } else {
                        columnChooserList.unselectItem(id, selected)
                    }
                }
            }
        } else {
            if (!isSelectMode || !columnChooserList || "full" === change) {
                this._popupContainer._wrapper().toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_DRAG_CLASS), !isSelectMode).toggleClass(this.addWidgetPrefix(COLUMN_CHOOSER_SELECT_CLASS), isSelectMode);
                items = processItems(this, chooserColumns);
                this._renderTreeView($popupContent, items)
            }
        }
    },
    _initializePopupContainer: function() {
        var that = this;
        var $element = that.element().addClass(that.addWidgetPrefix(COLUMN_CHOOSER_CLASS));
        var columnChooserOptions = that.option("columnChooser");
        var themeName = (0, _themes.current)();
        var isGenericTheme = (0, _themes.isGeneric)(themeName);
        var isMaterial = (0, _themes.isMaterial)(themeName);
        var dxPopupOptions = {
            visible: false,
            shading: false,
            showCloseButton: false,
            dragEnabled: true,
            resizeEnabled: true,
            toolbarItems: [{
                text: columnChooserOptions.title,
                toolbar: "top",
                location: isGenericTheme || isMaterial ? "before" : "center"
            }],
            position: that.getController("columnChooser").getPosition(),
            width: columnChooserOptions.width,
            height: columnChooserOptions.height,
            rtlEnabled: that.option("rtlEnabled"),
            onHidden: function() {
                if (that._isWinDevice()) {
                    (0, _renderer.default)("body").removeClass(that.addWidgetPrefix(NOTOUCH_ACTION_CLASS))
                }
            },
            container: columnChooserOptions.container
        };
        if (isGenericTheme || isMaterial) {
            (0, _extend.extend)(dxPopupOptions, {
                showCloseButton: true
            })
        } else {
            dxPopupOptions.toolbarItems[dxPopupOptions.toolbarItems.length] = {
                shortcut: "cancel"
            }
        }
        if (!(0, _type.isDefined)(this._popupContainer)) {
            that._popupContainer = that._createComponent($element, _popup.default, dxPopupOptions);
            that._popupContainer.on("optionChanged", function(args) {
                if ("visible" === args.name) {
                    that.renderCompleted.fire()
                }
            })
        } else {
            this._popupContainer.option(dxPopupOptions)
        }
    },
    _renderCore: function(change) {
        if (this._popupContainer) {
            this._updateList(change)
        }
    },
    _renderTreeView: function($container, items) {
        var that = this;
        var columnChooser = this.option("columnChooser");
        var isSelectMode = "select" === columnChooser.mode;
        var treeViewConfig = {
            items: items,
            dataStructure: "plain",
            activeStateEnabled: true,
            focusStateEnabled: true,
            hoverStateEnabled: true,
            itemTemplate: "item",
            showCheckBoxesMode: "none",
            rootValue: null,
            searchEnabled: columnChooser.allowSearch,
            searchTimeout: columnChooser.searchTimeout,
            onItemRendered: function(e) {
                if (e.itemData.disableCheckBox) {
                    var $treeViewNode = (0, _renderer.default)(e.itemElement).closest(TREEVIEW_NODE_SELECTOR);
                    var $checkBox;
                    if ($treeViewNode.length) {
                        $checkBox = $treeViewNode.find(CHECKBOX_SELECTOR);
                        if ($checkBox.length) {
                            var checkBoxInstance = $checkBox.data("dxCheckBox");
                            checkBoxInstance && checkBoxInstance.option("disabled", true)
                        }
                    }
                }
            }
        };
        var scrollableInstance = $container.find(".dx-scrollable").data("dxScrollable");
        var scrollTop = scrollableInstance && scrollableInstance.scrollTop();
        if (isSelectMode && !this._columnsController.isBandColumnsUsed()) {
            $container.addClass(this.addWidgetPrefix(COLUMN_CHOOSER_PLAIN_CLASS))
        }
        treeViewConfig.onContentReady = function(e) {
            (0, _common.deferUpdate)(function() {
                if (scrollTop) {
                    var scrollable = (0, _renderer.default)(e.element).find(".dx-scrollable").data("dxScrollable");
                    scrollable && scrollable.scrollTo({
                        y: scrollTop
                    })
                }
                that.renderCompleted.fire()
            })
        };
        if (this._isWinDevice()) {
            treeViewConfig.useNativeScrolling = false
        }(0, _extend.extend)(treeViewConfig, isSelectMode ? this._prepareSelectModeConfig() : this._prepareDragModeConfig());
        if (this._columnChooserList) {
            if (!treeViewConfig.searchEnabled) {
                treeViewConfig.searchValue = ""
            }
            this._columnChooserList.option(treeViewConfig)
        } else {
            this._columnChooserList = this._createComponent($container, _tree_view.default, treeViewConfig);
            $container.addClass(this.addWidgetPrefix(COLUMN_CHOOSER_LIST_CLASS))
        }
    },
    _prepareDragModeConfig: function() {
        var columnChooserOptions = this.option("columnChooser");
        return {
            noDataText: columnChooserOptions.emptyPanelText,
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            itemTemplate: function(data, index, item) {
                (0, _renderer.default)(item).text(data.text).parent().addClass(data.cssClass).addClass(COLUMN_CHOOSER_ITEM_CLASS)
            }
        }
    },
    _prepareSelectModeConfig: function() {
        var that = this;
        var selectionChangedHandler = function(e) {
            var visibleColumns = that._columnsController.getVisibleColumns().filter(function(item) {
                return !item.command
            });
            var isLastColumnUnselected = 1 === visibleColumns.length && !e.itemData.selected;
            if (isLastColumnUnselected) {
                e.component.selectItem(e.itemElement)
            } else {
                setTimeout(function() {
                    that._columnsController.columnOption(e.itemData.id, "visible", e.itemData.selected)
                }, CLICK_TIMEOUT)
            }
        };
        return {
            selectNodesRecursive: false,
            showCheckBoxesMode: "normal",
            onItemSelectionChanged: selectionChangedHandler
        }
    },
    _columnOptionChanged: function(e) {
        var changeTypes = e.changeTypes;
        var optionNames = e.optionNames;
        var isSelectMode = "select" === this.option("columnChooser.mode");
        this.callBase(e);
        if (isSelectMode) {
            var needPartialRender = optionNames.visible && 1 === optionNames.length && void 0 !== e.columnIndex;
            var needFullRender = optionNames.showInColumnChooser || optionNames.caption || optionNames.visible || changeTypes.columns && optionNames.all;
            if (needPartialRender) {
                this.render(null, {
                    changeType: "selection",
                    columnIndex: e.columnIndex
                })
            } else {
                if (needFullRender) {
                    this.render(null, "full")
                }
            }
        }
    },
    optionChanged: function(args) {
        switch (args.name) {
            case "columnChooser":
                this._initializePopupContainer();
                this.render(null, "full");
                break;
            default:
                this.callBase(args)
        }
    },
    getColumnElements: function() {
        var result = [];
        var $node;
        var isSelectMode = "select" === this.option("columnChooser.mode");
        var chooserColumns = this._columnsController.getChooserColumns(isSelectMode);
        var $content = this._popupContainer && this._popupContainer.$content();
        var $nodes = $content && $content.find(".dx-treeview-node");
        if ($nodes) {
            chooserColumns.forEach(function(column) {
                $node = $nodes.filter("[data-item-id = '" + column.index + "']");
                var item = $node.length ? $node.children("." + COLUMN_CHOOSER_ITEM_CLASS).get(0) : null;
                result.push(item)
            })
        }
        return (0, _renderer.default)(result)
    },
    getName: function() {
        return "columnChooser"
    },
    getColumns: function() {
        return this._columnsController.getChooserColumns()
    },
    allowDragging: function(column, sourceLocation) {
        var columnVisible = column && column.allowHiding && ("columnChooser" !== sourceLocation || !column.visible && this._columnsController.isParentColumnVisible(column.index));
        return this.isColumnChooserVisible() && columnVisible
    },
    getBoundingRect: function() {
        var that = this;
        var container = that._popupContainer && that._popupContainer._container();
        if (container && container.is(":visible")) {
            var offset = container.offset();
            return {
                left: offset.left,
                top: offset.top,
                right: offset.left + container.outerWidth(),
                bottom: offset.top + container.outerHeight()
            }
        }
        return null
    },
    showColumnChooser: function() {
        if (!this._popupContainer) {
            this._initializePopupContainer();
            this.render()
        }
        this._popupContainer.show();
        if (this._isWinDevice()) {
            (0, _renderer.default)("body").addClass(this.addWidgetPrefix(NOTOUCH_ACTION_CLASS))
        }
    },
    hideColumnChooser: function() {
        if (this._popupContainer) {
            this._popupContainer.hide()
        }
    },
    isColumnChooserVisible: function() {
        var popupContainer = this._popupContainer;
        return popupContainer && popupContainer.option("visible")
    },
    publicMethods: function() {
        return ["showColumnChooser", "hideColumnChooser"]
    }
});
var _default = {
    defaultOptions: function() {
        return {
            columnChooser: {
                enabled: false,
                allowSearch: false,
                searchTimeout: 500,
                mode: "dragAndDrop",
                width: 250,
                height: 260,
                title: _message.default.format("dxDataGrid-columnChooserTitle"),
                emptyPanelText: _message.default.format("dxDataGrid-columnChooserEmptyText"),
                container: void 0
            }
        }
    },
    controllers: {
        columnChooser: ColumnChooserController
    },
    views: {
        columnChooserView: ColumnChooserView
    },
    extenders: {
        views: {
            headerPanel: {
                _getToolbarItems: function() {
                    var items = this.callBase();
                    return this._appendColumnChooserItem(items)
                },
                _appendColumnChooserItem: function(items) {
                    var that = this;
                    var columnChooserEnabled = that.option("columnChooser.enabled");
                    if (columnChooserEnabled) {
                        var onClickHandler = function() {
                            that.component.getView("columnChooserView").showColumnChooser()
                        };
                        var onInitialized = function(e) {
                            (0, _renderer.default)(e.element).addClass(that._getToolbarButtonClass(that.addWidgetPrefix(COLUMN_CHOOSER_BUTTON_CLASS)))
                        };
                        var hintText = that.option("columnChooser.title");
                        var toolbarItem = {
                            widget: "dxButton",
                            options: {
                                icon: COLUMN_CHOOSER_ICON_NAME,
                                onClick: onClickHandler,
                                hint: hintText,
                                text: hintText,
                                onInitialized: onInitialized
                            },
                            showText: "inMenu",
                            location: "after",
                            name: "columnChooserButton",
                            locateInMenu: "auto",
                            sortIndex: 40
                        };
                        items.push(toolbarItem)
                    }
                    return items
                },
                optionChanged: function(args) {
                    switch (args.name) {
                        case "columnChooser":
                            this._invalidate();
                            args.handled = true;
                            break;
                        default:
                            this.callBase(args)
                    }
                },
                isVisible: function() {
                    var that = this;
                    var columnChooserEnabled = that.option("columnChooser.enabled");
                    return that.callBase() || columnChooserEnabled
                }
            }
        },
        controllers: {
            columns: {
                allowMoveColumn: function(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
                    var columnChooserMode = this.option("columnChooser.mode");
                    var isMoveColumnDisallowed = "select" === columnChooserMode && "columnChooser" === targetLocation;
                    return isMoveColumnDisallowed ? false : this.callBase(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation)
                }
            }
        }
    }
};
exports.default = _default;
module.exports = exports.default;
