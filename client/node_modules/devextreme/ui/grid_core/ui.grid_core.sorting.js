/**
 * DevExtreme (ui/grid_core/ui.grid_core.sorting.js)
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
var _click = require("../../events/click");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.sorting_mixin"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _index = require("../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COLUMN_HEADERS_VIEW_NAMESPACE = "dxDataGridColumnHeadersView";
var ColumnHeadersViewSortingExtender = (0, _extend.extend)({}, _uiGrid_core.default, {
    _createRow: function(row) {
        var _this = this;
        var $row = this.callBase(row);
        if ("header" === row.rowType) {
            _events_engine.default.on($row, (0, _index.addNamespace)(_click.name, COLUMN_HEADERS_VIEW_NAMESPACE), "td", this.createAction(function(e) {
                _this._processHeaderAction(e.event, $row)
            }))
        }
        return $row
    },
    _processHeaderAction: function(event, $row) {
        if ((0, _renderer.default)(event.currentTarget).parent().get(0) !== $row.get(0)) {
            return
        }
        var that = this;
        var keyName = null;
        var $cellElementFromEvent = (0, _renderer.default)(event.currentTarget);
        var rowIndex = $cellElementFromEvent.parent().index();
        var columnIndex = -1;
        [].slice.call(that.getCellElements(rowIndex)).some(function($cellElement, index) {
            if ($cellElement === $cellElementFromEvent.get(0)) {
                columnIndex = index;
                return true
            }
        });
        var visibleColumns = that._columnsController.getVisibleColumns(rowIndex);
        var column = visibleColumns[columnIndex];
        var editingController = that.getController("editing");
        var editingMode = that.option("editing.mode");
        var isCellEditing = editingController && editingController.isEditing() && ("batch" === editingMode || "cell" === editingMode);
        if (isCellEditing || !that._isSortableElement((0, _renderer.default)(event.target))) {
            return
        }
        if (column && !(0, _type.isDefined)(column.groupIndex) && !column.command) {
            if (event.shiftKey) {
                keyName = "shift"
            } else {
                if (event.ctrlKey) {
                    keyName = "ctrl"
                }
            }
            setTimeout(function() {
                that._columnsController.changeSortOrder(column.index, keyName)
            })
        }
    },
    _renderCellContent: function($cell, options) {
        var that = this;
        var column = options.column;
        if (!column.command && "header" === options.rowType) {
            that._applyColumnState({
                name: "sort",
                rootElement: $cell,
                column: column,
                showColumnLines: that.option("showColumnLines")
            })
        }
        that.callBase($cell, options)
    },
    _columnOptionChanged: function(e) {
        var changeTypes = e.changeTypes;
        if (1 === changeTypes.length && changeTypes.sorting) {
            this._updateIndicators("sort");
            return
        }
        this.callBase(e)
    },
    optionChanged: function(args) {
        var that = this;
        switch (args.name) {
            case "sorting":
                that._invalidate();
                args.handled = true;
                break;
            default:
                that.callBase(args)
        }
    }
});
var HeaderPanelSortingExtender = (0, _extend.extend)({}, _uiGrid_core.default, {
    _createGroupPanelItem: function($rootElement, groupColumn) {
        var that = this;
        var $item = that.callBase.apply(that, arguments);
        _events_engine.default.on($item, (0, _index.addNamespace)(_click.name, "dxDataGridHeaderPanel"), that.createAction(function() {
            that._processGroupItemAction(groupColumn.index)
        }));
        that._applyColumnState({
            name: "sort",
            rootElement: $item,
            column: {
                alignment: that.option("rtlEnabled") ? "right" : "left",
                allowSorting: groupColumn.allowSorting,
                sortOrder: "desc" === groupColumn.sortOrder ? "desc" : "asc"
            },
            showColumnLines: true
        });
        return $item
    },
    _processGroupItemAction: function(groupColumnIndex) {
        var _this2 = this;
        setTimeout(function() {
            return _this2.getController("columns").changeSortOrder(groupColumnIndex)
        })
    },
    optionChanged: function(args) {
        var that = this;
        switch (args.name) {
            case "sorting":
                that._invalidate();
                args.handled = true;
                break;
            default:
                that.callBase(args)
        }
    }
});
var _default = {
    defaultOptions: function() {
        return {
            sorting: {
                mode: "single",
                ascendingText: _message.default.format("dxDataGrid-sortingAscendingText"),
                descendingText: _message.default.format("dxDataGrid-sortingDescendingText"),
                clearText: _message.default.format("dxDataGrid-sortingClearText"),
                showSortIndexes: true
            }
        }
    },
    extenders: {
        views: {
            columnHeadersView: ColumnHeadersViewSortingExtender,
            headerPanel: HeaderPanelSortingExtender
        }
    }
};
exports.default = _default;
module.exports = exports.default;
