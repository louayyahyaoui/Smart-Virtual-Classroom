/**
 * DevExtreme (ui/grid_core/ui.grid_core.virtual_columns.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _window = require("../../core/utils/window");
var _uiGrid_core = require("./ui.grid_core.virtual_columns_core");
var DEFAULT_COLUMN_WIDTH = 50;
var VirtualScrollingRowsViewExtender = {
    _resizeCore: function() {
        this.callBase.apply(this, arguments);
        this._columnsController.resize()
    },
    _handleScroll: function(e) {
        var that = this;
        var scrollable = this.getScrollable();
        var left = e.scrollOffset.left;
        that.callBase.apply(that, arguments);
        if (that.option("rtlEnabled") && scrollable) {
            left = scrollable.$content().width() - scrollable.$element().width() - left
        }
        that._columnsController.setScrollPosition(left)
    }
};
var HeaderFooterViewExtender = {
    _renderCore: function() {
        var that = this;
        var scrollLeft = that._scrollLeft;
        that.callBase.apply(that, arguments);
        if (that._columnsController.isVirtualMode() && scrollLeft >= 0) {
            that._scrollLeft = 0;
            that.scrollTo({
                left: scrollLeft
            })
        }
    }
};
var ColumnsControllerExtender = function() {
    var getWidths = function(columns) {
        return columns.map(function(column) {
            return column.visibleWidth || parseFloat(column.width) || DEFAULT_COLUMN_WIDTH
        })
    };
    var members = {
        init: function() {
            var that = this;
            that.callBase();
            that._beginPageIndex = 0;
            that._endPageIndex = 0;
            that._position = 0;
            that._virtualVisibleColumns = {}
        },
        resetColumnsCache: function() {
            this.callBase();
            this._virtualVisibleColumns = {}
        },
        getBeginPageIndex: function(position) {
            var visibleColumns = this.getVisibleColumns(void 0, true);
            var widths = getWidths(visibleColumns);
            var currentPosition = 0;
            for (var index = 0; index < widths.length; index++) {
                if (currentPosition >= position) {
                    return Math.floor(index / this.getColumnPageSize())
                }
                currentPosition += widths[index]
            }
            return 0
        },
        getTotalWidth: function() {
            var width = this.option("width");
            if ("number" === typeof width) {
                return width
            }
            return this.getController("resizing")._lastWidth || this.component.$element().outerWidth()
        },
        getEndPageIndex: function(position) {
            var visibleColumns = this.getVisibleColumns(void 0, true);
            var widths = getWidths(visibleColumns);
            var currentPosition = 0;
            position += this.getTotalWidth();
            for (var index = 0; index < widths.length; index++) {
                if (currentPosition >= position) {
                    return Math.ceil(index / this.getColumnPageSize())
                }
                currentPosition += widths[index]
            }
            return Math.ceil(widths.length / this.getColumnPageSize())
        },
        getColumnPageSize: function() {
            return this.option("scrolling.columnPageSize")
        },
        _fireColumnsChanged: function() {
            var date = new Date;
            this.columnsChanged.fire({
                optionNames: {
                    all: true,
                    length: 1
                },
                changeTypes: {
                    columns: true,
                    length: 1
                }
            });
            this._renderTime = new Date - date
        },
        setScrollPosition: function(position) {
            var that = this;
            var renderingThreshold = that.option("scrolling.columnRenderingThreshold");
            if (that._renderTime > renderingThreshold) {
                clearTimeout(that._changedTimeout);
                that._changedTimeout = setTimeout(function() {
                    that._setScrollPositionCore(position)
                }, that.option("scrolling.timeout"))
            } else {
                that._setScrollPositionCore(position)
            }
        },
        isVirtualMode: function() {
            return (0, _window.hasWindow)() && "virtual" === this.option("scrolling.columnRenderingMode")
        },
        resize: function() {
            this._setScrollPositionCore(this._position)
        },
        _setScrollPositionCore: function(position) {
            var that = this;
            if (that.isVirtualMode()) {
                var beginPageIndex = that.getBeginPageIndex(position);
                var endPageIndex = that.getEndPageIndex(position);
                var needColumnsChanged = position < that._position ? that._beginPageIndex > beginPageIndex : that._endPageIndex < endPageIndex;
                that._position = position;
                if (needColumnsChanged) {
                    that._beginPageIndex = beginPageIndex;
                    that._endPageIndex = endPageIndex;
                    that._fireColumnsChanged()
                }
            }
        },
        getFixedColumns: function(rowIndex, isBase) {
            var fixedColumns = this.callBase(rowIndex);
            if (this.isVirtualMode() && !isBase && fixedColumns.length) {
                var transparentColumnIndex = fixedColumns.map(function(c) {
                    return c.command
                }).indexOf("transparent");
                fixedColumns[transparentColumnIndex].colspan = this.getVisibleColumns().length - this.callBase().length + 1;
                return fixedColumns
            }
            return fixedColumns
        },
        getVisibleColumns: function(rowIndex, isBase) {
            if (isBase || !this.isVirtualMode()) {
                return this.callBase(rowIndex)
            }
            if (!this._beginPageIndex && !this._endPageIndex) {
                this._beginPageIndex = this.getBeginPageIndex(this._position);
                this._endPageIndex = this.getEndPageIndex(this._position)
            }
            var beginPageIndex = this._beginPageIndex;
            var endPageIndex = this._endPageIndex;
            var visibleColumnsHash = rowIndex + "-" + beginPageIndex + "-" + endPageIndex;
            if (this._virtualVisibleColumns[visibleColumnsHash]) {
                return this._virtualVisibleColumns[visibleColumnsHash]
            }
            var visibleColumns = this.callBase();
            var rowCount = this.getRowCount();
            var pageSize = this.getColumnPageSize();
            var startIndex = beginPageIndex * pageSize;
            var endIndex = endPageIndex * pageSize;
            var fixedColumns = this.getFixedColumns(void 0, true);
            var transparentColumnIndex = fixedColumns.map(function(c) {
                return c.command
            }).indexOf("transparent");
            var beginFixedColumnCount = fixedColumns.length ? transparentColumnIndex : 0;
            var beginFixedColumns = visibleColumns.slice(0, beginFixedColumnCount);
            var beginColumns = visibleColumns.slice(beginFixedColumnCount, startIndex);
            var beginWidth = getWidths(beginColumns).reduce(function(a, b) {
                return a + b
            }, 0);
            if (!beginWidth) {
                startIndex = 0
            }
            var endFixedColumnCount = fixedColumns.length ? fixedColumns.length - transparentColumnIndex - 1 : 0;
            var endFixedColumns = visibleColumns.slice(visibleColumns.length - endFixedColumnCount);
            var endColumns = visibleColumns.slice(endIndex, visibleColumns.length - endFixedColumnCount);
            var endWidth = getWidths(endColumns).reduce(function(a, b) {
                return a + b
            }, 0);
            if (!endWidth) {
                endIndex = visibleColumns.length
            }
            if (rowCount > 1 && "number" === typeof rowIndex) {
                var columnsInfo = [];
                for (var i = 0; i < rowCount; i++) {
                    columnsInfo.push(this.callBase(i))
                }
                beginFixedColumns = (0, _uiGrid_core.createColumnsInfo)(columnsInfo, 0, beginFixedColumns.length)[rowIndex] || [];
                endFixedColumns = (0, _uiGrid_core.createColumnsInfo)(columnsInfo, visibleColumns.length - endFixedColumns.length, visibleColumns.length)[rowIndex] || [];
                visibleColumns = (0, _uiGrid_core.createColumnsInfo)(columnsInfo, startIndex, endIndex)[rowIndex] || []
            } else {
                visibleColumns = visibleColumns.slice(startIndex, endIndex)
            }
            if (beginWidth) {
                visibleColumns.unshift({
                    command: "virtual",
                    width: beginWidth
                });
                visibleColumns = beginFixedColumns.concat(visibleColumns)
            }
            if (endWidth) {
                visibleColumns.push({
                    command: "virtual",
                    width: endWidth
                });
                visibleColumns = visibleColumns.concat(endFixedColumns)
            }
            this._virtualVisibleColumns[visibleColumnsHash] = visibleColumns;
            return visibleColumns
        },
        getColumnIndexOffset: function() {
            var offset = 0;
            if (this._beginPageIndex > 0) {
                var fixedColumns = this.getFixedColumns();
                var transparentColumnIndex = fixedColumns.map(function(c) {
                    return c.command
                }).indexOf("transparent");
                var leftFixedColumnCount = transparentColumnIndex >= 0 ? transparentColumnIndex : 0;
                offset = this._beginPageIndex * this.getColumnPageSize() - leftFixedColumnCount - 1
            }
            return offset > 0 ? offset : 0
        },
        dispose: function() {
            clearTimeout(this._changedTimeout);
            this.callBase.apply(this, arguments)
        }
    };
    return members
}();
var _default = {
    defaultOptions: function() {
        return {
            scrolling: {
                columnRenderingMode: "standard",
                columnPageSize: 5,
                columnRenderingThreshold: 300
            }
        }
    },
    extenders: {
        controllers: {
            columns: ColumnsControllerExtender
        },
        views: {
            columnHeadersView: HeaderFooterViewExtender,
            footerView: HeaderFooterViewExtender,
            rowsView: VirtualScrollingRowsViewExtender
        }
    }
};
exports.default = _default;
module.exports = exports.default;
