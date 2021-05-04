/**
 * DevExtreme (ui/grid_core/ui.grid_core.row_dragging.js)
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
var _sortable = _interopRequireDefault(require("../sortable"));
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.utils"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COMMAND_HANDLE_CLASS = "dx-command-drag";
var CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
var HANDLE_ICON_CLASS = "drag-icon";
var ROWS_VIEW = "rowsview";
var SORTABLE_WITHOUT_HANDLE_CLASS = "dx-sortable-without-handle";
var RowDraggingExtender = {
    init: function() {
        this.callBase.apply(this, arguments);
        this._updateHandleColumn()
    },
    _allowReordering: function() {
        var rowDragging = this.option("rowDragging");
        return !!(rowDragging && (rowDragging.allowReordering || rowDragging.allowDropInsideItem || rowDragging.group))
    },
    _updateHandleColumn: function() {
        var rowDragging = this.option("rowDragging");
        var allowReordering = this._allowReordering();
        var columnsController = this._columnsController;
        var isHandleColumnVisible = allowReordering && rowDragging.showDragIcons;
        columnsController && columnsController.addCommandColumn({
            type: "drag",
            command: "drag",
            visibleIndex: -2,
            alignment: "center",
            cssClass: COMMAND_HANDLE_CLASS,
            width: "auto",
            cellTemplate: this._getHandleTemplate(),
            visible: isHandleColumnVisible
        });
        columnsController.columnOption("type:drag", "visible", isHandleColumnVisible)
    },
    _renderContent: function() {
        var _this = this;
        var rowDragging = this.option("rowDragging");
        var allowReordering = this._allowReordering();
        var $content = this.callBase.apply(this, arguments);
        var isFixedTableRendering = this._isFixedTableRendering;
        var sortableName = "_sortable";
        var sortableFixedName = "_sortableFixed";
        var currentSortableName = isFixedTableRendering ? sortableFixedName : sortableName;
        var anotherSortableName = isFixedTableRendering ? sortableName : sortableFixedName;
        var togglePointerEventsStyle = function(toggle) {
            var _this$sortableFixedNa;
            null === (_this$sortableFixedNa = _this[sortableFixedName]) || void 0 === _this$sortableFixedNa ? void 0 : _this$sortableFixedNa.$element().css("pointerEvents", toggle ? "auto" : "")
        };
        if ((allowReordering || this[currentSortableName]) && $content.length) {
            this[currentSortableName] = this._createComponent($content, _sortable.default, (0, _extend.extend)({
                component: this.component,
                contentTemplate: null,
                filter: "> table > tbody > .dx-row:not(.dx-freespace-row):not(.dx-virtual-row)",
                dragTemplate: this._getDraggableRowTemplate(),
                handle: rowDragging.showDragIcons && ".".concat(COMMAND_HANDLE_CLASS),
                dropFeedbackMode: "indicate"
            }, rowDragging, {
                onDragStart: function(e) {
                    var _rowDragging$onDragSt;
                    var row = e.component.getVisibleRows()[e.fromIndex];
                    e.itemData = row && row.data;
                    var isDataRow = row && "data" === row.rowType;
                    e.cancel = !allowReordering || !isDataRow;
                    null === (_rowDragging$onDragSt = rowDragging.onDragStart) || void 0 === _rowDragging$onDragSt ? void 0 : _rowDragging$onDragSt.call(rowDragging, e)
                },
                onDragEnter: function() {
                    togglePointerEventsStyle(true)
                },
                onDragLeave: function() {
                    togglePointerEventsStyle(false)
                },
                onDragEnd: function(e) {
                    var _rowDragging$onDragEn;
                    togglePointerEventsStyle(false);
                    null === (_rowDragging$onDragEn = rowDragging.onDragEnd) || void 0 === _rowDragging$onDragEn ? void 0 : _rowDragging$onDragEn.call(rowDragging, e)
                },
                dropFeedbackMode: _browser.default.msie ? "indicate" : rowDragging.dropFeedbackMode,
                onOptionChanged: function(e) {
                    var hasFixedSortable = _this[sortableFixedName];
                    if (hasFixedSortable) {
                        if ("fromIndex" === e.name || "toIndex" === e.name) {
                            _this[anotherSortableName].option(e.name, e.value)
                        }
                    }
                }
            }));
            $content.toggleClass(SORTABLE_WITHOUT_HANDLE_CLASS, allowReordering && !rowDragging.showDragIcons)
        }
        return $content
    },
    _resizeCore: function() {
        this.callBase.apply(this, arguments);
        var offset = this._dataController.getRowIndexOffset();
        [this._sortable, this._sortableFixed].forEach(function(sortable) {
            null === sortable || void 0 === sortable ? void 0 : sortable.option("offset", offset);
            null === sortable || void 0 === sortable ? void 0 : sortable.update()
        })
    },
    _getDraggableGridOptions: function(options) {
        var gridOptions = this.option();
        var columns = this.getColumns();
        var $rowElement = (0, _renderer.default)(this.getRowElement(options.rowIndex));
        return {
            dataSource: [{
                id: 1,
                parentId: 0
            }],
            showBorders: true,
            showColumnHeaders: false,
            scrolling: {
                useNative: false,
                showScrollbar: false
            },
            pager: {
                visible: false
            },
            loadingTimeout: void 0,
            columnFixing: gridOptions.columnFixing,
            columnAutoWidth: gridOptions.columnAutoWidth,
            showColumnLines: gridOptions.showColumnLines,
            columns: columns.map(function(column) {
                return {
                    width: column.width || column.visibleWidth,
                    fixed: column.fixed,
                    fixedPosition: column.fixedPosition
                }
            }),
            onRowPrepared: function(e) {
                var rowsView = e.component.getView("rowsView");
                (0, _renderer.default)(e.rowElement).replaceWith($rowElement.eq(rowsView._isFixedTableRendering ? 1 : 0).clone())
            }
        }
    },
    _getDraggableRowTemplate: function() {
        var _this2 = this;
        return function(options) {
            var $rootElement = _this2.component.$element();
            var $dataGridContainer = (0, _renderer.default)("<div>").width($rootElement.width());
            var items = _this2._dataController.items();
            var row = items && items[options.fromIndex];
            var gridOptions = _this2._getDraggableGridOptions(row);
            _this2._createComponent($dataGridContainer, _this2.component.NAME, gridOptions);
            $dataGridContainer.find(".dx-gridbase-container").children(":not(.".concat(_this2.addWidgetPrefix(ROWS_VIEW), ")")).hide();
            return $dataGridContainer
        }
    },
    _getHandleTemplate: function() {
        var _this3 = this;
        return function(container, options) {
            if ("data" === options.rowType) {
                (0, _renderer.default)(container).addClass(CELL_FOCUS_DISABLED_CLASS);
                return (0, _renderer.default)("<span>").addClass(_this3.addWidgetPrefix(HANDLE_ICON_CLASS))
            } else {
                _uiGrid_core.default.setEmptyText((0, _renderer.default)(container))
            }
        }
    },
    optionChanged: function(args) {
        if ("rowDragging" === args.name) {
            this._updateHandleColumn();
            this._invalidate(true, true);
            args.handled = true
        }
        this.callBase.apply(this, arguments)
    }
};
var _default = {
    defaultOptions: function() {
        return {
            rowDragging: {
                showDragIcons: true,
                dropFeedbackMode: "indicate",
                allowReordering: false,
                allowDropInsideItem: false
            }
        }
    },
    extenders: {
        views: {
            rowsView: RowDraggingExtender
        }
    }
};
exports.default = _default;
module.exports = exports.default;
