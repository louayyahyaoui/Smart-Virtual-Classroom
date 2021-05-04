/**
 * DevExtreme (ui/grid_core/ui.grid_core.columns_view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
exports.ColumnsView = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _window = require("../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _element_data = require("../../core/element_data");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _click = require("../../events/click");
var _double_click = require("../../events/double_click");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _common = require("../../core/utils/common");
var _style = require("../../core/utils/style");
var _element = require("../../core/element");
var _type = require("../../core/utils/type");
var _position = require("../../core/utils/position");
var iteratorUtils = _interopRequireWildcard(require("../../core/utils/iterator"));
var _extend = require("../../core/utils/extend");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));
var _uiGrid_core3 = _interopRequireDefault(require("./ui.grid_core.column_state_mixin"));
var _deferred = require("../../core/utils/deferred");

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SCROLL_CONTAINER_CLASS = "scroll-container";
var GROUP_SPACE_CLASS = "group-space";
var CONTENT_CLASS = "content";
var TABLE_CLASS = "table";
var TABLE_FIXED_CLASS = "table-fixed";
var CONTENT_FIXED_CLASS = "content-fixed";
var ROW_CLASS = "dx-row";
var GROUP_ROW_CLASS = "dx-group-row";
var DETAIL_ROW_CLASS = "dx-master-detail-row";
var FILTER_ROW_CLASS = "filter-row";
var CELL_UPDATED_ANIMATION_CLASS = "cell-updated-animation";
var HIDDEN_COLUMNS_WIDTH = "0.0001px";
var CELL_HINT_VISIBLE = "dxCellHintVisible";
var FORM_FIELD_ITEM_CONTENT_CLASS = "dx-field-item-content";
var appendElementTemplate = {
    render: function(options) {
        options.container.append(options.content)
    }
};
var subscribeToRowEvents = function(that, $table) {
    var touchTarget;
    var touchCurrentTarget;
    var timeoutId;

    function clearTouchTargets(timeout) {
        return setTimeout(function() {
            touchTarget = touchCurrentTarget = null
        }, timeout)
    }
    _events_engine.default.on($table, "touchstart touchend", ".dx-row", function(e) {
        clearTimeout(timeoutId);
        if ("touchstart" === e.type) {
            touchTarget = e.target;
            touchCurrentTarget = e.currentTarget;
            timeoutId = clearTouchTargets(1e3)
        } else {
            timeoutId = clearTouchTargets()
        }
    });
    _events_engine.default.on($table, [_click.name, _double_click.name, _pointer.default.down].join(" "), ".dx-row", {
        useNative: that._isNativeClick()
    }, that.createAction(function(e) {
        var event = e.event;
        if (touchTarget) {
            event.target = touchTarget;
            event.currentTarget = touchCurrentTarget
        }
        if (!(0, _renderer.default)(event.target).closest("a").length) {
            e.rowIndex = that.getRowIndex(event.currentTarget);
            if (e.rowIndex >= 0) {
                e.rowElement = (0, _element.getPublicElement)((0, _renderer.default)(event.currentTarget));
                e.columns = that.getColumns();
                if (event.type === _pointer.default.down) {
                    that._rowPointerDown(e)
                } else {
                    if (event.type === _click.name) {
                        that._rowClick(e)
                    } else {
                        that._rowDblClick(e)
                    }
                }
            }
        }
    }))
};
var getWidthStyle = function(width) {
    if ("auto" === width) {
        return ""
    }
    return (0, _type.isNumeric)(width) ? width + "px" : width
};
var setCellWidth = function(cell, column, width) {
    cell.style.width = cell.style.maxWidth = "auto" === column.width ? "" : width
};
var copyAttributes = function(element, newElement) {
    if (!element || !newElement) {
        return
    }
    var oldAttributes = element.attributes;
    var newAttributes = newElement.attributes;
    var i;
    for (i = 0; i < oldAttributes.length; i++) {
        var name = oldAttributes[i].nodeName;
        if (!newElement.hasAttribute(name)) {
            element.removeAttribute(name)
        }
    }
    for (i = 0; i < newAttributes.length; i++) {
        element.setAttribute(newAttributes[i].nodeName, newAttributes[i].nodeValue)
    }
};
var ColumnsView = _uiGrid_core.default.View.inherit(_uiGrid_core3.default).inherit({
    _createScrollableOptions: function() {
        var that = this;
        var scrollingOptions = that.option("scrolling");
        var useNativeScrolling = that.option("scrolling.useNative");
        var options = (0, _extend.extend)({
            pushBackValue: 0
        }, scrollingOptions, {
            direction: "both",
            bounceEnabled: false,
            useKeyboard: false
        });
        if (void 0 === useNativeScrolling) {
            useNativeScrolling = true
        }
        if ("auto" === useNativeScrolling) {
            delete options.useNative;
            delete options.useSimulatedScrollbar
        } else {
            options.useNative = !!useNativeScrolling;
            options.useSimulatedScrollbar = !useNativeScrolling
        }
        return options
    },
    _updateCell: function($cell, parameters) {
        if (parameters.rowType) {
            this._cellPrepared($cell, parameters)
        }
    },
    _createCell: function(options) {
        var column = options.column;
        var alignment = column.alignment || (0, _position.getDefaultAlignment)(this.option("rtlEnabled"));
        var cell = _dom_adapter.default.createElement("td");
        cell.style.textAlign = alignment;
        var $cell = (0, _renderer.default)(cell);
        if ("data" === options.rowType && column.headerId && !column.type) {
            if (this.component.option("showColumnHeaders")) {
                this.setAria("describedby", column.headerId, $cell)
            }
        }
        if (column.cssClass) {
            $cell.addClass(column.cssClass)
        }
        if ("expand" === column.command) {
            $cell.addClass(column.cssClass);
            $cell.addClass(this.addWidgetPrefix(GROUP_SPACE_CLASS))
        }
        if (column.colspan > 1) {
            $cell.attr("colSpan", column.colspan)
        } else {
            if (!column.isBand && "auto" !== column.visibleWidth && !this.option("legacyRendering") && this.option("columnAutoWidth")) {
                if (column.width || column.minWidth) {
                    cell.style.minWidth = getWidthStyle(column.minWidth || column.width)
                }
                if (column.width) {
                    setCellWidth(cell, column, getWidthStyle(column.width))
                }
            }
        }
        return $cell
    },
    _createRow: function(rowObject) {
        var $element = (0, _renderer.default)("<tr>").addClass(ROW_CLASS);
        this.setAria("role", "row", $element);
        return $element
    },
    _isAltRow: function(row) {
        return row && row.dataIndex % 2 === 1
    },
    _createTable: function(columns, isAppend) {
        var that = this;
        var $table = (0, _renderer.default)("<table>").addClass(that.addWidgetPrefix(TABLE_CLASS)).addClass(that.addWidgetPrefix(TABLE_FIXED_CLASS));
        if (columns && !isAppend) {
            $table.append(that._createColGroup(columns));
            if (_browser.default.safari) {
                $table.append((0, _renderer.default)("<thead>").append("<tr>"))
            }
            that.setAria("role", "presentation", $table)
        } else {
            that.setAria("hidden", true, $table)
        }
        this.setAria("role", "presentation", (0, _renderer.default)("<tbody>").appendTo($table));
        if (isAppend) {
            return $table
        }
        if (_browser.default.mozilla) {
            _events_engine.default.on($table, "mousedown", "td", function(e) {
                if (e.ctrlKey) {
                    e.preventDefault()
                }
            })
        }
        if (that.option("cellHintEnabled")) {
            _events_engine.default.on($table, "mousemove", ".dx-row > td", this.createAction(function(args) {
                var e = args.event;
                var $element = (0, _renderer.default)(e.target);
                var $cell = (0, _renderer.default)(e.currentTarget);
                var $row = $cell.parent();
                var isDataRow = $row.hasClass("dx-data-row");
                var isHeaderRow = $row.hasClass("dx-header-row");
                var isGroupRow = $row.hasClass(GROUP_ROW_CLASS);
                var isMasterDetailRow = $row.hasClass(DETAIL_ROW_CLASS);
                var isFilterRow = $row.hasClass(that.addWidgetPrefix(FILTER_ROW_CLASS));
                var visibleColumns = that._columnsController.getVisibleColumns();
                var rowOptions = $row.data("options");
                var columnIndex = $cell.index();
                var cellOptions = rowOptions && rowOptions.cells && rowOptions.cells[columnIndex];
                var column = cellOptions ? cellOptions.column : visibleColumns[columnIndex];
                var msieCorrection = _browser.default.msie ? 1 : 0;
                if (!isMasterDetailRow && !isFilterRow && (!isDataRow || isDataRow && column && !column.cellTemplate) && (!isHeaderRow || isHeaderRow && column && !column.headerCellTemplate) && (!isGroupRow || isGroupRow && column && (void 0 === column.groupIndex || !column.groupCellTemplate))) {
                    if ($element.data(CELL_HINT_VISIBLE)) {
                        $element.removeAttr("title");
                        $element.data(CELL_HINT_VISIBLE, false)
                    }
                    var difference = $element[0].scrollWidth - $element[0].clientWidth - msieCorrection;
                    if (difference > 0 && !(0, _type.isDefined)($element.attr("title"))) {
                        $element.attr("title", $element.text());
                        $element.data(CELL_HINT_VISIBLE, true)
                    }
                }
            }))
        }
        var getOptions = function(event) {
            var $cell = (0, _renderer.default)(event.currentTarget);
            var $fieldItemContent = (0, _renderer.default)(event.target).closest("." + FORM_FIELD_ITEM_CONTENT_CLASS);
            var rowOptions = $cell.parent().data("options");
            var options = rowOptions && rowOptions.cells && rowOptions.cells[$cell.index()];
            if (!$cell.closest("table").is(event.delegateTarget)) {
                return
            }
            var resultOptions = (0, _extend.extend)({}, options, {
                cellElement: (0, _element.getPublicElement)($cell),
                event: event,
                eventType: event.type
            });
            if ($fieldItemContent.length) {
                var formItemOptions = $fieldItemContent.data("dx-form-item");
                if (formItemOptions.column) {
                    resultOptions.column = formItemOptions.column;
                    resultOptions.columnIndex = that._columnsController.getVisibleIndex(resultOptions.column.index)
                }
            }
            return resultOptions
        };
        _events_engine.default.on($table, "mouseover", ".dx-row > td", function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellHoverChanged", options)
        });
        _events_engine.default.on($table, "mouseout", ".dx-row > td", function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellHoverChanged", options)
        });
        _events_engine.default.on($table, _click.name, ".dx-row > td", function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellClick", options)
        });
        _events_engine.default.on($table, _double_click.name, ".dx-row > td", function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellDblClick", options)
        });
        subscribeToRowEvents(that, $table);
        return $table
    },
    _isNativeClick: _common.noop,
    _rowPointerDown: _common.noop,
    _rowClick: _common.noop,
    _rowDblClick: _common.noop,
    _createColGroup: function(columns) {
        var colgroupElement = (0, _renderer.default)("<colgroup>");
        for (var i = 0; i < columns.length; i++) {
            var colspan = columns[i].colspan || 1;
            for (var j = 0; j < colspan; j++) {
                colgroupElement.append(this._createCol(columns[i]))
            }
        }
        return colgroupElement
    },
    _createCol: function(column) {
        var width = column.visibleWidth || column.width;
        if ("adaptiveHidden" === width) {
            width = HIDDEN_COLUMNS_WIDTH
        }
        var col = (0, _renderer.default)("<col>");
        (0, _style.setWidth)(col, width);
        return col
    },
    renderDelayedTemplates: function() {
        var delayedTemplates = this._delayedTemplates;
        var syncTemplates = delayedTemplates.filter(function(template) {
            return !template.async
        });
        var asyncTemplates = delayedTemplates.filter(function(template) {
            return template.async
        });
        this._delayedTemplates = [];
        this._renderDelayedTemplatesCore(syncTemplates);
        this._renderDelayedTemplatesCoreAsync(asyncTemplates)
    },
    _renderDelayedTemplatesCoreAsync: function(templates) {
        var that = this;
        if (templates.length) {
            (0, _window.getWindow)().setTimeout(function() {
                that._renderDelayedTemplatesCore(templates, true)
            })
        }
    },
    _renderDelayedTemplatesCore: function(templates, isAsync) {
        var date = new Date;
        while (templates.length) {
            var templateParameters = templates.shift();
            var options = templateParameters.options;
            var doc = _dom_adapter.default.getDocument();
            if (!isAsync || (0, _renderer.default)(options.container).closest(doc).length) {
                templateParameters.template.render(options)
            }
            if (isAsync && new Date - date > 30) {
                this._renderDelayedTemplatesCoreAsync(templates);
                break
            }
        }
        if (!templates.length && this._delayedTemplates.length) {
            this.renderDelayedTemplates()
        }
    },
    _processTemplate: function(template) {
        var that = this;
        var renderingTemplate;
        if (template && template.render && !(0, _type.isRenderer)(template)) {
            renderingTemplate = {
                allowRenderToDetachedContainer: template.allowRenderToDetachedContainer,
                render: function(options) {
                    template.render(options.container, options.model);
                    options.deferred && options.deferred.resolve()
                }
            }
        } else {
            if ((0, _type.isFunction)(template)) {
                renderingTemplate = {
                    render: function(options) {
                        var renderedTemplate = template((0, _element.getPublicElement)(options.container), options.model);
                        if (renderedTemplate && (renderedTemplate.nodeType || (0, _type.isRenderer)(renderedTemplate))) {
                            options.container.append(renderedTemplate)
                        }
                        options.deferred && options.deferred.resolve()
                    }
                }
            } else {
                var templateID = (0, _type.isString)(template) ? template : (0, _renderer.default)(template).attr("id");
                if (!templateID) {
                    renderingTemplate = that.getTemplate(template)
                } else {
                    if (!that._templatesCache[templateID]) {
                        that._templatesCache[templateID] = that.getTemplate(template)
                    }
                    renderingTemplate = that._templatesCache[templateID]
                }
            }
        }
        return renderingTemplate
    },
    renderTemplate: function(container, template, options, allowRenderToDetachedContainer) {
        var that = this;
        var renderingTemplate = that._processTemplate(template, options);
        var column = options.column;
        var isDataRow = "data" === options.rowType;
        var templateDeferred = new _deferred.Deferred;
        var templateOptions = {
            container: container,
            model: options,
            deferred: templateDeferred,
            onRendered: function() {
                templateDeferred.resolve()
            }
        };
        if (renderingTemplate) {
            options.component = that.component;
            var async = column && (column.renderAsync && isDataRow || that.option("renderAsync") && (false !== column.renderAsync && (column.command || column.showEditorAlways) && isDataRow || "filter" === options.rowType));
            if ((renderingTemplate.allowRenderToDetachedContainer || allowRenderToDetachedContainer) && !async) {
                renderingTemplate.render(templateOptions)
            } else {
                that._delayedTemplates.push({
                    template: renderingTemplate,
                    options: templateOptions,
                    async: async
                })
            }
        } else {
            templateDeferred.reject()
        }
        return templateDeferred.promise()
    },
    _getBodies: function(tableElement) {
        return (0, _renderer.default)(tableElement).children("tbody").not(".dx-header").not(".dx-footer")
    },
    _wrapRowIfNeed: function($table, $row) {
        var $tBodies = this.option("rowTemplate") && this._getBodies(this._tableElement || $table);
        if ($tBodies && $tBodies.filter("." + ROW_CLASS).length) {
            var $tbody = (0, _renderer.default)("<tbody>").addClass($row.attr("class"));
            this.setAria("role", "presentation", $tbody);
            return $tbody.append($row)
        }
        return $row
    },
    _appendRow: function($table, $row, appendTemplate) {
        appendTemplate = appendTemplate || appendElementTemplate;
        appendTemplate.render({
            content: $row,
            container: $table
        })
    },
    _resizeCore: function() {
        var scrollLeft = this._scrollLeft;
        if (scrollLeft >= 0) {
            this._scrollLeft = 0;
            this.scrollTo({
                left: scrollLeft
            })
        }
    },
    _renderCore: function(e) {
        var $root = this.element().parent();
        if (!$root || $root.parent().length) {
            this.renderDelayedTemplates(e)
        }
    },
    _renderTable: function(options) {
        options = options || {};
        options.columns = this._columnsController.getVisibleColumns();
        var changeType = options.change && options.change.changeType;
        var $table = this._createTable(options.columns, "append" === changeType || "prepend" === changeType || "update" === changeType);
        this._renderRows($table, options);
        return $table
    },
    _renderRows: function($table, options) {
        var that = this;
        var rows = that._getRows(options.change);
        var columnIndices = options.change && options.change.columnIndices || [];
        var changeTypes = options.change && options.change.changeTypes || [];
        for (var i = 0; i < rows.length; i++) {
            that._renderRow($table, (0, _extend.extend)({
                row: rows[i],
                columnIndices: columnIndices[i],
                changeType: changeTypes[i]
            }, options))
        }
    },
    _renderRow: function($table, options) {
        if (!options.columnIndices) {
            options.row.cells = []
        }
        var $row = this._createRow(options.row);
        var $wrappedRow = this._wrapRowIfNeed($table, $row);
        if ("remove" !== options.changeType) {
            this._renderCells($row, options)
        }
        this._appendRow($table, $wrappedRow);
        var rowOptions = (0, _extend.extend)({
            columns: options.columns
        }, options.row);
        this._addWatchMethod(rowOptions, options.row);
        this._rowPrepared($wrappedRow, rowOptions, options.row)
    },
    _needRenderCell: function(columnIndex, columnIndices) {
        return !columnIndices || columnIndices.indexOf(columnIndex) >= 0
    },
    _renderCells: function($row, options) {
        var that = this;
        var columnIndex = 0;
        var row = options.row;
        var columns = options.columns;
        for (var i = 0; i < columns.length; i++) {
            if (this._needRenderCell(i, options.columnIndices)) {
                that._renderCell($row, (0, _extend.extend)({
                    column: columns[i],
                    columnIndex: columnIndex,
                    value: row.values && row.values[columnIndex],
                    oldValue: row.oldValues && row.oldValues[columnIndex]
                }, options))
            }
            if (columns[i].colspan > 1) {
                columnIndex += columns[i].colspan
            } else {
                columnIndex++
            }
        }
    },
    _updateCells: function($rowElement, $newRowElement, columnIndices) {
        var $cells = $rowElement.children();
        var $newCells = $newRowElement.children();
        var highlightChanges = this.option("highlightChanges");
        var cellUpdatedClass = this.addWidgetPrefix(CELL_UPDATED_ANIMATION_CLASS);
        columnIndices.forEach(function(columnIndex, index) {
            var $cell = $cells.eq(columnIndex);
            var $newCell = $newCells.eq(index);
            $cell.replaceWith($newCell);
            if (highlightChanges && !$newCell.hasClass("dx-command-expand")) {
                $newCell.addClass(cellUpdatedClass)
            }
        });
        copyAttributes($rowElement.get(0), $newRowElement.get(0))
    },
    _setCellAriaAttributes: function($cell, cellOptions) {
        if ("freeSpace" !== cellOptions.rowType) {
            this.setAria("selected", false, $cell);
            this.setAria("role", "gridcell", $cell);
            var columnIndexOffset = this._columnsController.getColumnIndexOffset();
            var ariaColIndex = cellOptions.columnIndex + columnIndexOffset + 1;
            this.setAria("colindex", ariaColIndex, $cell)
        }
    },
    _renderCell: function($row, options) {
        var cellOptions = this._getCellOptions(options);
        if (options.columnIndices) {
            if (options.row.cells) {
                options.row.cells[cellOptions.columnIndex] = cellOptions
            }
        } else {
            options.row.cells.push(cellOptions)
        }
        var $cell = this._createCell(cellOptions);
        this._setCellAriaAttributes($cell, cellOptions);
        this._renderCellContent($cell, cellOptions);
        $row.get(0).appendChild($cell.get(0));
        return $cell
    },
    _renderCellContent: function($cell, options) {
        var _this = this;
        var template = this._getCellTemplate(options);
        (0, _deferred.when)(!template || this.renderTemplate($cell, template, options)).done(function() {
            _this._updateCell($cell, options)
        })
    },
    _getCellTemplate: function() {},
    _getRows: function() {
        return []
    },
    _getCellOptions: function(options) {
        var cellOptions = {
            column: options.column,
            columnIndex: options.columnIndex,
            rowType: options.row.rowType,
            isAltRow: this._isAltRow(options.row)
        };
        this._addWatchMethod(cellOptions);
        return cellOptions
    },
    _addWatchMethod: function(options, source) {
        if (!this.option("repaintChangesOnly")) {
            return
        }
        var watchers = [];
        source = source || options;
        source.watch = source.watch || function(getter, updateFunc) {
            var oldValue = getter(source.data);
            var watcher = function(row) {
                var newValue = getter(source.data);
                if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                    if (row) {
                        updateFunc(newValue, oldValue)
                    }
                    oldValue = newValue
                }
            };
            watchers.push(watcher);
            var stopWatch = function() {
                var index = watchers.indexOf(watcher);
                if (index >= 0) {
                    watchers.splice(index, 1)
                }
            };
            return stopWatch
        };
        source.update = source.update || function(row) {
            if (row) {
                this.data = options.data = row.data;
                this.rowIndex = options.rowIndex = row.rowIndex;
                this.dataIndex = options.dataIndex = row.dataIndex;
                this.isExpanded = options.isExpanded = row.isExpanded;
                if (options.row) {
                    options.row = row
                }
            }
            watchers.forEach(function(watcher) {
                watcher(row)
            })
        };
        if (source !== options) {
            options.watch = source.watch.bind(source)
        }
        return options
    },
    _cellPrepared: function(cell, options) {
        options.cellElement = (0, _element.getPublicElement)((0, _renderer.default)(cell));
        this.executeAction("onCellPrepared", options)
    },
    _rowPrepared: function($row, options) {
        (0, _element_data.data)($row.get(0), "options", options);
        options.rowElement = (0, _element.getPublicElement)($row);
        this.executeAction("onRowPrepared", options)
    },
    _columnOptionChanged: function(e) {
        var optionNames = e.optionNames;
        if (_uiGrid_core2.default.checkChanges(optionNames, ["width", "visibleWidth"])) {
            var visibleColumns = this._columnsController.getVisibleColumns();
            var widths = iteratorUtils.map(visibleColumns, function(column) {
                var width = column.visibleWidth || column.width;
                return (0, _type.isDefined)(width) ? width : "auto"
            });
            this.setColumnWidths({
                widths: widths,
                optionNames: optionNames
            });
            return
        }
        if (!this._requireReady) {
            this.render()
        }
    },
    getCellIndex: function($cell) {
        var cellIndex = $cell.length ? $cell[0].cellIndex : -1;
        return cellIndex
    },
    getTableElements: function() {
        return this._tableElement || (0, _renderer.default)()
    },
    getTableElement: function() {
        return this._tableElement
    },
    setTableElement: function(tableElement) {
        this._tableElement = tableElement
    },
    optionChanged: function(args) {
        this.callBase(args);
        switch (args.name) {
            case "cellHintEnabled":
            case "onCellPrepared":
            case "onRowPrepared":
            case "onCellHoverChanged":
                this._invalidate(true, true);
                args.handled = true
        }
    },
    init: function() {
        var that = this;
        that._scrollLeft = -1;
        that._columnsController = that.getController("columns");
        that._dataController = that.getController("data");
        that._delayedTemplates = [];
        that._templatesCache = {};
        that.createAction("onCellClick");
        that.createAction("onRowClick");
        that.createAction("onCellDblClick");
        that.createAction("onRowDblClick");
        that.createAction("onCellHoverChanged", {
            excludeValidators: ["disabled", "readOnly"]
        });
        that.createAction("onCellPrepared", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        });
        that.createAction("onRowPrepared", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering",
            afterExecute: function(e) {
                that._afterRowPrepared(e)
            }
        });
        that._columnsController.columnsChanged.add(that._columnOptionChanged.bind(that));
        that._dataController && that._dataController.changed.add(that._handleDataChanged.bind(that))
    },
    _afterRowPrepared: _common.noop,
    _handleDataChanged: function() {},
    callbackNames: function() {
        return ["scrollChanged"]
    },
    scrollTo: function(pos) {
        var $element = this.element();
        var $scrollContainer = $element && $element.children("." + this.addWidgetPrefix(SCROLL_CONTAINER_CLASS)).not("." + this.addWidgetPrefix(CONTENT_FIXED_CLASS));
        if ((0, _type.isDefined)(pos) && (0, _type.isDefined)(pos.left) && this._scrollLeft !== pos.left) {
            this._scrollLeft = pos.left;
            $scrollContainer && $scrollContainer.scrollLeft(pos.left)
        }
    },
    _wrapTableInScrollContainer: function($table) {
        var _this2 = this;
        var $scrollContainer = (0, _renderer.default)("<div>");
        _events_engine.default.on($scrollContainer, "scroll", function() {
            var scrollLeft = $scrollContainer.scrollLeft();
            if (scrollLeft !== _this2._scrollLeft) {
                _this2.scrollChanged.fire({
                    left: scrollLeft
                }, _this2.name)
            }
        });
        $scrollContainer.addClass(this.addWidgetPrefix(CONTENT_CLASS)).addClass(this.addWidgetPrefix(SCROLL_CONTAINER_CLASS)).append($table).appendTo(this.element());
        this.setAria("role", "presentation", $scrollContainer);
        return $scrollContainer
    },
    _updateContent: function($newTableElement) {
        this.setTableElement($newTableElement);
        this._wrapTableInScrollContainer($newTableElement)
    },
    _findContentElement: _common.noop,
    _getWidths: function($cellElements) {
        var result = [];
        var legacyRendering = this.option("legacyRendering");
        var width;
        if ($cellElements) {
            iteratorUtils.each($cellElements, function(index, item) {
                width = item.offsetWidth;
                if (item.getBoundingClientRect) {
                    var clientRect = (0, _position.getBoundingRect)(item);
                    if (clientRect.width > width - 1) {
                        width = legacyRendering ? Math.ceil(clientRect.width) : clientRect.width
                    }
                }
                result.push(width)
            })
        }
        return result
    },
    getColumnWidths: function($tableElement) {
        var that = this;
        var result = [];
        var $rows;
        var $cells;
        (this.option("forceApplyBindings") || _common.noop)();
        $tableElement = $tableElement || that.getTableElement();
        if ($tableElement) {
            $rows = $tableElement.children("tbody:not(.dx-header)").children();
            for (var i = 0; i < $rows.length; i++) {
                var $row = $rows.eq(i);
                var isRowVisible = "none" !== $row.get(0).style.display && !$row.hasClass("dx-state-invisible");
                if (!$row.is("." + GROUP_ROW_CLASS) && !$row.is("." + DETAIL_ROW_CLASS) && isRowVisible) {
                    $cells = $row.children("td");
                    break
                }
            }
            result = that._getWidths($cells)
        }
        return result
    },
    getVisibleColumnIndex: function(columnIndex, rowIndex) {
        return columnIndex
    },
    setColumnWidths: function(_ref) {
        var widths = _ref.widths,
            $tableElement = _ref.$tableElement,
            columns = _ref.columns,
            fixed = _ref.fixed;
        var $cols;
        var width;
        var minWidth;
        var columnIndex;
        var columnAutoWidth = this.option("columnAutoWidth");
        var legacyRendering = this.option("legacyRendering");
        $tableElement = $tableElement || this.getTableElement();
        if ($tableElement && $tableElement.length && widths) {
            columnIndex = 0;
            $cols = $tableElement.children("colgroup").children("col");
            (0, _style.setWidth)($cols, "auto");
            columns = columns || this.getColumns(null, $tableElement);
            for (var i = 0; i < columns.length; i++) {
                if (!legacyRendering && columnAutoWidth && !fixed) {
                    width = columns[i].width;
                    if (width && !columns[i].command) {
                        width = columns[i].visibleWidth || width;
                        width = getWidthStyle(width);
                        minWidth = getWidthStyle(columns[i].minWidth || width);
                        var $rows = $rows || $tableElement.children().children(".dx-row").not("." + GROUP_ROW_CLASS).not("." + DETAIL_ROW_CLASS);
                        for (var rowIndex = 0; rowIndex < $rows.length; rowIndex++) {
                            var visibleIndex = this.getVisibleColumnIndex(i, rowIndex);
                            var cell = $rows[rowIndex].cells[visibleIndex];
                            if (cell) {
                                setCellWidth(cell, columns[i], width);
                                cell.style.minWidth = minWidth
                            }
                        }
                    }
                }
                if (columns[i].colspan) {
                    columnIndex += columns[i].colspan;
                    continue
                }
                width = widths[columnIndex];
                if ("adaptiveHidden" === width) {
                    width = HIDDEN_COLUMNS_WIDTH
                }
                if ("number" === typeof width) {
                    width = width.toFixed(3) + "px"
                }(0, _style.setWidth)($cols.eq(columnIndex), (0, _type.isDefined)(width) ? width : "auto");
                columnIndex++
            }
        }
    },
    getCellElements: function(rowIndex) {
        return this._getCellElementsCore(rowIndex)
    },
    _getCellElementsCore: function(rowIndex) {
        var $row = this._getRowElements().eq(rowIndex);
        return $row.children()
    },
    _getCellElement: function(rowIndex, columnIdentifier) {
        var that = this;
        var $cell;
        var $cells = that.getCellElements(rowIndex);
        var columnVisibleIndex = that._getVisibleColumnIndex($cells, rowIndex, columnIdentifier);
        if ($cells.length && columnVisibleIndex >= 0) {
            $cell = $cells.eq(columnVisibleIndex)
        }
        if ($cell && $cell.length) {
            return $cell
        }
    },
    _getRowElement: function(rowIndex) {
        var that = this;
        var $rowElement = (0, _renderer.default)();
        var $tableElements = that.getTableElements();
        iteratorUtils.each($tableElements, function(_, tableElement) {
            $rowElement = $rowElement.add(that._getRowElements((0, _renderer.default)(tableElement)).eq(rowIndex))
        });
        if ($rowElement.length) {
            return $rowElement
        }
    },
    getCellElement: function(rowIndex, columnIdentifier) {
        return (0, _element.getPublicElement)(this._getCellElement(rowIndex, columnIdentifier))
    },
    getRowElement: function(rowIndex) {
        var $rows = this._getRowElement(rowIndex);
        var elements = [];
        if ($rows && !(0, _element.getPublicElement)($rows).get) {
            for (var i = 0; i < $rows.length; i++) {
                elements.push($rows[i])
            }
        } else {
            elements = $rows
        }
        return elements
    },
    _getVisibleColumnIndex: function($cells, rowIndex, columnIdentifier) {
        if ((0, _type.isString)(columnIdentifier)) {
            var columnIndex = this._columnsController.columnOption(columnIdentifier, "index");
            return this._columnsController.getVisibleIndex(columnIndex)
        }
        return columnIdentifier
    },
    getColumnElements: function() {},
    getColumns: function(rowIndex) {
        return this._columnsController.getVisibleColumns(rowIndex)
    },
    getCell: function(cellPosition, rows) {
        var $rows = rows || this._getRowElements();
        var $cells;
        if ($rows.length > 0 && cellPosition.rowIndex >= 0) {
            if ("virtual" !== this.option("scrolling.mode")) {
                cellPosition.rowIndex = cellPosition.rowIndex < $rows.length ? cellPosition.rowIndex : $rows.length - 1
            }
            $cells = this.getCellElements(cellPosition.rowIndex);
            if ($cells && $cells.length > 0) {
                return $cells.eq($cells.length > cellPosition.columnIndex ? cellPosition.columnIndex : $cells.length - 1)
            }
        }
    },
    getRowsCount: function() {
        var tableElement = this.getTableElement();
        if (tableElement && 1 === tableElement.length) {
            return tableElement[0].rows.length
        }
        return 0
    },
    _getRowElementsCore: function(tableElement) {
        tableElement = tableElement || this.getTableElement();
        if (tableElement) {
            var tBodies = this.option("rowTemplate") && tableElement.find("> tbody." + ROW_CLASS);
            return tBodies && tBodies.length ? tBodies : tableElement.find("> tbody > ." + ROW_CLASS + ", > ." + ROW_CLASS)
        }
        return (0, _renderer.default)()
    },
    _getRowElements: function(tableElement) {
        return this._getRowElementsCore(tableElement)
    },
    getRowIndex: function($row) {
        return this._getRowElements().index($row)
    },
    getBoundingRect: function() {},
    getName: function() {},
    setScrollerSpacing: function(width) {
        var that = this;
        var $element = that.element();
        var rtlEnabled = that.option("rtlEnabled");
        $element && $element.css({
            paddingLeft: rtlEnabled ? width : "",
            paddingRight: !rtlEnabled ? width : ""
        })
    },
    isScrollbarVisible: function(isHorizontal) {
        var $element = this.element();
        var $tableElement = this._tableElement;
        if ($element && $tableElement) {
            return isHorizontal ? $tableElement.outerWidth() - $element.width() > 0 : $tableElement.outerHeight() - $element.height() > 0
        }
        return false
    }
});
exports.ColumnsView = ColumnsView;
