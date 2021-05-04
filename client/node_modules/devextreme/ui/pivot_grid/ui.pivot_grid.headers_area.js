/**
 * DevExtreme (ui/pivot_grid/ui.pivot_grid.headers_area.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.VerticalHeadersArea = exports.HorizontalHeadersArea = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _array = require("../../core/utils/array");
var _iterator = require("../../core/utils/iterator");
var _uiPivot_grid = require("./ui.pivot_grid.area_item");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var PIVOTGRID_AREA_CLASS = "dx-pivotgrid-area";
var PIVOTGRID_AREA_COLUMN_CLASS = "dx-pivotgrid-horizontal-headers";
var PIVOTGRID_AREA_ROW_CLASS = "dx-pivotgrid-vertical-headers";
var PIVOTGRID_TOTAL_CLASS = "dx-total";
var PIVOTGRID_GRAND_TOTAL_CLASS = "dx-grandtotal";
var PIVOTGRID_ROW_TOTAL_CLASS = "dx-row-total";
var PIVOTGRID_EXPANDED_CLASS = "dx-pivotgrid-expanded";
var PIVOTGRID_COLLAPSED_CLASS = "dx-pivotgrid-collapsed";
var PIVOTGRID_LAST_CELL_CLASS = "dx-last-cell";
var PIVOTGRID_VERTICAL_SCROLL_CLASS = "dx-vertical-scroll";
var PIVOTGRID_EXPAND_BORDER = "dx-expand-border";

function getCellPath(tableElement, cell) {
    if (cell) {
        var data = tableElement.data().data;
        var rowIndex = cell.parentNode.rowIndex;
        var cellIndex = cell.cellIndex;
        return data[rowIndex] && data[rowIndex][cellIndex] && data[rowIndex][cellIndex].path
    }
}
var HorizontalHeadersArea = _uiPivot_grid.AreaItem.inherit({
    _getAreaName: function() {
        return "column"
    },
    _getAreaClassName: function() {
        return PIVOTGRID_AREA_COLUMN_CLASS
    },
    _createGroupElement: function() {
        return (0, _renderer.default)("<div>").addClass(this._getAreaClassName()).addClass(PIVOTGRID_AREA_CLASS)
    },
    _applyCustomStyles: function(options) {
        var cssArray = options.cssArray;
        var cell = options.cell;
        var rowsCount = options.rowsCount;
        var classArray = options.classArray;
        if (options.cellIndex === options.cellsCount - 1) {
            cssArray.push((options.rtlEnabled ? "border-left:" : "border-right:") + "0px")
        }
        if (cell.rowspan === rowsCount - options.rowIndex || options.rowIndex + 1 === rowsCount) {
            cssArray.push("border-bottom-width:0px")
        }
        if ("T" === cell.type || "GT" === cell.type) {
            classArray.push(PIVOTGRID_ROW_TOTAL_CLASS)
        }
        if ("T" === options.cell.type) {
            classArray.push(PIVOTGRID_TOTAL_CLASS)
        }
        if ("GT" === options.cell.type) {
            classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS)
        }
        if ((0, _type.isDefined)(cell.expanded)) {
            classArray.push(cell.expanded ? PIVOTGRID_EXPANDED_CLASS : PIVOTGRID_COLLAPSED_CLASS)
        }
        this.callBase(options)
    },
    _getMainElementMarkup: function() {
        return "<thead class='" + this._getAreaClassName() + "'>"
    },
    _getCloseMainElementMarkup: function() {
        return "</thead>"
    },
    setVirtualContentParams: function(params) {
        this.callBase(params);
        this._setTableCss({
            left: params.left,
            top: 0
        });
        this._virtualContentWidth = params.width
    },
    hasScroll: function() {
        var tableWidth = this._virtualContent ? this._virtualContentWidth : this._tableWidth;
        if (this._groupWidth && tableWidth) {
            return tableWidth - this._groupWidth >= 1
        }
        return false
    },
    processScroll: function() {
        if (!this._getScrollable()) {
            this._groupElement.dxScrollable({
                useNative: false,
                useSimulatedScrollbar: false,
                showScrollbar: false,
                bounceEnabled: false,
                direction: "horizontal",
                updateManually: true
            })
        }
    },
    processScrollBarSpacing: function(scrollBarWidth) {
        var that = this;
        var groupAlignment = that.option("rtlEnabled") ? "right" : "left";
        if (that._groupWidth) {
            that.groupWidth(that._groupWidth - scrollBarWidth)
        }
        if (that._scrollBarWidth) {
            that._groupElement.next().remove()
        }
        that._groupElement.toggleClass(PIVOTGRID_VERTICAL_SCROLL_CLASS, scrollBarWidth > 0);
        that._groupElement.css("float", groupAlignment).width(that._groupHeight);
        that._scrollBarWidth = scrollBarWidth
    },
    ctor: function(component) {
        this.callBase(component);
        this._scrollBarWidth = 0
    },
    getScrollPath: function(offset) {
        var tableElement = this.tableElement();
        var cell;
        offset -= parseInt(tableElement[0].style.left, 10) || 0;
        (0, _iterator.each)(tableElement.find("td"), function(_, td) {
            if (1 === td.colSpan && td.offsetLeft <= offset && td.offsetWidth + td.offsetLeft > offset) {
                cell = td;
                return false
            }
        });
        return getCellPath(tableElement, cell)
    },
    _moveFakeTable: function(scrollPos) {
        this._moveFakeTableHorizontally(scrollPos);
        this.callBase()
    }
});
exports.HorizontalHeadersArea = HorizontalHeadersArea;
var VerticalHeadersArea = HorizontalHeadersArea.inherit({
    _getAreaClassName: function() {
        return PIVOTGRID_AREA_ROW_CLASS
    },
    _applyCustomStyles: function(options) {
        this.callBase(options);
        if (options.cellIndex === options.cellsCount - 1) {
            options.classArray.push(PIVOTGRID_LAST_CELL_CLASS)
        }
        if (options.rowIndex === options.rowsCount - 1) {
            options.cssArray.push("border-bottom: 0px")
        }
        if (options.cell.isWhiteSpace) {
            options.classArray.push("dx-white-space-column")
        }
    },
    _getAreaName: function() {
        return "row"
    },
    setVirtualContentParams: function(params) {
        this.callBase(params);
        this._setTableCss({
            top: params.top,
            left: 0
        });
        this._virtualContentHeight = params.height
    },
    hasScroll: function() {
        var tableHeight = this._virtualContent ? this._virtualContentHeight : this._tableHeight;
        if (this._groupHeight && tableHeight) {
            return tableHeight - this._groupHeight >= 1
        }
        return false
    },
    processScroll: function() {
        if (!this._getScrollable()) {
            this._groupElement.dxScrollable({
                useNative: false,
                useSimulatedScrollbar: false,
                showScrollbar: false,
                bounceEnabled: false,
                direction: "vertical",
                updateManually: true
            })
        }
    },
    processScrollBarSpacing: function(scrollBarWidth) {
        var that = this;
        if (that._groupHeight) {
            that.groupHeight(that._groupHeight - scrollBarWidth)
        }
        if (that._scrollBarWidth) {
            that._groupElement.next().remove()
        }
        if (scrollBarWidth) {
            that._groupElement.after((0, _renderer.default)("<div>").width("100%").height(scrollBarWidth - 1))
        }
        that._scrollBarWidth = scrollBarWidth
    },
    getScrollPath: function(offset) {
        var tableElement = this.tableElement();
        var cell;
        offset -= parseInt(tableElement[0].style.top, 10) || 0;
        (0, _iterator.each)(tableElement.find("tr"), function(_, tr) {
            var td = tr.childNodes[tr.childNodes.length - 1];
            if (td && 1 === td.rowSpan && td.offsetTop <= offset && td.offsetHeight + td.offsetTop > offset) {
                cell = td;
                return false
            }
        });
        return getCellPath(tableElement, cell)
    },
    _moveFakeTable: function(scrollPos) {
        this._moveFakeTableTop(scrollPos);
        this.callBase()
    },
    _getRowClassNames: function(rowIndex, cell, rowClassNames) {
        if (0 !== rowIndex & cell.expanded && (0, _array.inArray)(PIVOTGRID_EXPAND_BORDER, rowClassNames) === -1) {
            rowClassNames.push(PIVOTGRID_EXPAND_BORDER)
        }
    },
    _getMainElementMarkup: function() {
        return "<tbody class='" + this._getAreaClassName() + "'>"
    },
    _getCloseMainElementMarkup: function() {
        return "</tbody>"
    },
    updateColspans: function(columnCount) {
        var rows = this.tableElement()[0].rows;
        var columnOffset = 0;
        var columnOffsetResetIndexes = [];
        if (this.getColumnsCount() - columnCount > 0) {
            return
        }
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].cells.length; j++) {
                var cell = rows[i].cells[j];
                var rowSpan = cell.rowSpan;
                if (columnOffsetResetIndexes[i]) {
                    columnOffset -= columnOffsetResetIndexes[i];
                    columnOffsetResetIndexes[i] = 0
                }
                var diff = columnCount - (columnOffset + cell.colSpan);
                if (j === rows[i].cells.length - 1 && diff > 0) {
                    cell.colSpan = cell.colSpan + diff
                }
                columnOffsetResetIndexes[i + rowSpan] = (columnOffsetResetIndexes[i + rowSpan] || 0) + cell.colSpan;
                columnOffset += cell.colSpan
            }
        }
    }
});
exports.VerticalHeadersArea = VerticalHeadersArea;
