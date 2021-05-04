/**
 * DevExtreme (ui/gantt/ui.gantt.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("../../core/utils/type");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _data = require("../../core/utils/data");
var _uiGantt = require("./ui.gantt.view");
var _uiGantt2 = require("./ui.gantt.bars");
var _tree_list = _interopRequireDefault(require("../tree_list"));
var _extend = require("../../core/utils/extend");
var _position = require("../../core/utils/position");
var _window = require("../../core/utils/window");
var _uiGanttData = _interopRequireDefault(require("./ui.gantt.data.option"));
var _splitter = _interopRequireDefault(require("../splitter"));
var _uiGantt3 = require("./ui.gantt.dialogs");
var _load_panel = _interopRequireDefault(require("../load_panel"));
var _element = require("../../core/element");
var _uiGantt4 = require("./ui.gantt.cache");

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
var GANTT_CLASS = "dx-gantt";
var GANTT_VIEW_CLASS = "dx-gantt-view";
var GANTT_COLLAPSABLE_ROW = "dx-gantt-collapsable-row";
var GANTT_TREE_LIST_WRAPPER = "dx-gantt-treelist-wrapper";
var GANTT_TOOLBAR_WRAPPER = "dx-gantt-toolbar-wrapper";
var GANTT_MAIN_WRAPPER = "dx-gantt-main-wrapper";
var GANTT_TASKS = "tasks";
var GANTT_DEPENDENCIES = "dependencies";
var GANTT_RESOURCES = "resources";
var GANTT_RESOURCE_ASSIGNMENTS = "resourceAssignments";
var GANTT_NEW_TASK_CACHE_KEY = "gantt_new_task_key";
var GANTT_DEFAULT_ROW_HEIGHT = 34;
var GANTT_MAPPED_FIELD_REGEX = /(\w*)Expr/;
var Gantt = function(_Widget) {
    _inheritsLoose(Gantt, _Widget);

    function Gantt() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = Gantt.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this._cache = new _uiGantt4.GanttDataCache;
        this._isGanttRendered = false
    };
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this.$element().addClass(GANTT_CLASS);
        this._$toolbarWrapper = (0, _renderer.default)("<div>").addClass(GANTT_TOOLBAR_WRAPPER).appendTo(this.$element());
        this._$toolbar = (0, _renderer.default)("<div>").appendTo(this._$toolbarWrapper);
        this._$mainWrapper = (0, _renderer.default)("<div>").addClass(GANTT_MAIN_WRAPPER).appendTo(this.$element());
        this._$treeListWrapper = (0, _renderer.default)("<div>").addClass(GANTT_TREE_LIST_WRAPPER).appendTo(this._$mainWrapper);
        this._$treeList = (0, _renderer.default)("<div>").appendTo(this._$treeListWrapper);
        this._$splitter = (0, _renderer.default)("<div>").appendTo(this._$mainWrapper);
        this._$ganttView = (0, _renderer.default)("<div>").addClass(GANTT_VIEW_CLASS).appendTo(this._$mainWrapper);
        this._$dialog = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._$loadPanel = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._$contextMenu = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._refreshDataSource(GANTT_TASKS);
        this._refreshDataSource(GANTT_DEPENDENCIES);
        this._refreshDataSource(GANTT_RESOURCES);
        this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS)
    };
    _proto._refresh = function() {
        this._isGanttRendered = false;
        _Widget.prototype._refresh.call(this)
    };
    _proto._renderContent = function() {
        this._isMainElementVisible = this.$element().is(":visible");
        if (this._isMainElementVisible && !this._isGanttRendered) {
            this._isGanttRendered = true;
            this._renderBars();
            this._renderTreeList();
            this._renderSplitter()
        }
    };
    _proto._renderTreeList = function() {
        var _this = this;
        var _this$option = this.option(GANTT_TASKS),
            keyExpr = _this$option.keyExpr,
            parentIdExpr = _this$option.parentIdExpr;
        this._treeList = this._createComponent(this._$treeList, _tree_list.default, {
            dataSource: this._tasksRaw,
            keyExpr: keyExpr,
            parentIdExpr: parentIdExpr,
            columns: this._getTreeListColumns(),
            columnResizingMode: "nextColumn",
            height: this._getTreeListHeight(),
            width: this.option("taskListWidth"),
            selection: {
                mode: this._getSelectionMode(this.option("allowSelection"))
            },
            selectedRowKeys: this._getArrayFromOneElement(this.option("selectedRowKey")),
            sorting: {
                mode: "none"
            },
            scrolling: {
                showScrollbar: "onHover",
                mode: "virtual"
            },
            allowColumnResizing: true,
            autoExpandAll: true,
            showRowLines: this.option("showRowLines"),
            rootValue: this.option("rootValue"),
            onContentReady: function(e) {
                _this._onTreeListContentReady(e)
            },
            onSelectionChanged: function(e) {
                _this._onTreeListSelectionChanged(e)
            },
            onRowCollapsed: function(e) {
                _this._onTreeListRowCollapsed(e)
            },
            onRowExpanded: function(e) {
                _this._onTreeListRowExpanded(e)
            },
            onRowPrepared: function(e) {
                _this._onTreeListRowPrepared(e)
            },
            onContextMenuPreparing: function(e) {
                _this._onTreeListContextMenuPreparing(e)
            },
            onRowClick: function(e) {
                _this._onTreeListRowClick(e)
            },
            onRowDblClick: function(e) {
                _this._onTreeListRowDblClick(e)
            }
        })
    };
    _proto._renderSplitter = function() {
        this._splitter = this._createComponent(this._$splitter, _splitter.default, {
            container: this.$element(),
            leftElement: this._$treeListWrapper,
            rightElement: this._$ganttView,
            onApplyPanelSize: this._onApplyPanelSize.bind(this)
        });
        this._splitter.option("initialLeftPanelWidth", this.option("taskListWidth"))
    };
    _proto._renderBars = function() {
        this._bars = [];
        this._toolbar = new _uiGantt2.GanttToolbar(this._$toolbar, this);
        this._updateToolbarContent();
        this._bars.push(this._toolbar);
        this._contextMenuBar = new _uiGantt2.GanttContextMenuBar(this._$contextMenu, this);
        this._updateContextMenu();
        this._bars.push(this._contextMenuBar)
    };
    _proto._initGanttView = function() {
        var _this2 = this;
        if (this._ganttView) {
            return
        }
        this._ganttView = this._createComponent(this._$ganttView, _uiGantt.GanttView, {
            width: "100%",
            height: this._treeList._$element.get(0).offsetHeight,
            rowHeight: this._getTreeListRowHeight(),
            headerHeight: this._getTreeListHeaderHeight(),
            tasks: this._tasks,
            dependencies: this._dependencies,
            resources: this._resources,
            resourceAssignments: this._resourceAssignments,
            allowSelection: this.option("allowSelection"),
            selectedRowKey: this.option("selectedRowKey"),
            showResources: this.option("showResources"),
            taskTitlePosition: this.option("taskTitlePosition"),
            firstDayOfWeek: this.option("firstDayOfWeek"),
            showRowLines: this.option("showRowLines"),
            scaleType: this.option("scaleType"),
            editing: this.option("editing"),
            validation: this.option("validation"),
            stripLines: this.option("stripLines"),
            bars: this._bars,
            mainElement: this.$element(),
            onSelectionChanged: this._onGanttViewSelectionChanged.bind(this),
            onScroll: this._onGanttViewScroll.bind(this),
            onDialogShowing: this._showDialog.bind(this),
            onPopupMenuShowing: this._showPopupMenu.bind(this),
            onExpandAll: this._expandAll.bind(this),
            onCollapseAll: this._collapseAll.bind(this),
            modelChangesListener: this._createModelChangesListener(),
            taskTooltipContentTemplate: this._getTaskTooltipContentTemplateFunc(this.option("taskTooltipContentTemplate")),
            onTaskClick: function(e) {
                _this2._onTreeListRowClick(e)
            },
            onTaskDblClick: function(e) {
                _this2._onTreeListRowDblClick(e)
            },
            onAdjustControl: function() {
                _this2._onAdjustControl()
            }
        });
        this._fireContentReadyAction()
    };
    _proto._onAdjustControl = function() {
        var _this$_ganttView;
        var toolbarHeight = this._$toolbarWrapper.get(0).offsetHeight;
        this._setTreeListOption("height", "100%");
        this._setTreeListOption("height", this._$treeList.height() - toolbarHeight);
        this._adjustHeight();
        null === (_this$_ganttView = this._ganttView) || void 0 === _this$_ganttView ? void 0 : _this$_ganttView._ganttViewCore.resetAndUpdate();
        this._splitter.option("initialLeftPanelWidth", this._$treeListWrapper.width())
    };
    _proto._onApplyPanelSize = function(e) {
        var _this$_ganttView2;
        this._setInnerElementsWidth(e);
        var rowHeight = this._getTreeListRowHeight();
        null === (_this$_ganttView2 = this._ganttView) || void 0 === _this$_ganttView2 ? void 0 : _this$_ganttView2._ganttViewCore.updateRowHeights(rowHeight)
    };
    _proto._onTreeListContentReady = function(e) {
        if (e.component.getDataSource()) {
            this._initGanttView();
            this._initScrollSync(e.component)
        }
    };
    _proto._onTreeListRowPrepared = function(e) {
        if ("data" === e.rowType && e.node.children.length > 0) {
            (0, _renderer.default)(e.rowElement).addClass(GANTT_COLLAPSABLE_ROW)
        }
    };
    _proto._onTreeListContextMenuPreparing = function(e) {
        var _e$row, _e$row2;
        if ("data" === (null === (_e$row = e.row) || void 0 === _e$row ? void 0 : _e$row.rowType)) {
            this._setTreeListOption("selectedRowKeys", [e.row.data[this.option("tasks.keyExpr")]])
        }
        e.items = [];
        var info = {
            cancel: false,
            event: e.event,
            type: "task",
            key: null === (_e$row2 = e.row) || void 0 === _e$row2 ? void 0 : _e$row2.key,
            position: {
                x: e.event.pageX,
                y: e.event.pageY
            }
        };
        this._showPopupMenu(info)
    };
    _proto._onTreeListRowClick = function(e) {
        this._raiseTaskClickAction(e.key, e.event)
    };
    _proto._onTreeListRowDblClick = function(e) {
        if (this._raiseTaskDblClickAction(e.key, e.event)) {
            this._ganttView._ganttViewCore.commandManager.showTaskEditDialog.execute()
        }
    };
    _proto._onTreeListSelectionChanged = function(e) {
        var selectedRowKey = e.currentSelectedRowKeys[0];
        this._setGanttViewOption("selectedRowKey", selectedRowKey);
        this.option("selectedRowKey", selectedRowKey);
        this._raiseSelectionChangedAction(selectedRowKey)
    };
    _proto._onTreeListRowCollapsed = function(e) {
        this._ganttView.changeTaskExpanded(e.key, false);
        this._adjustHeight()
    };
    _proto._onTreeListRowExpanded = function(e) {
        this._ganttView.changeTaskExpanded(e.key, true);
        this._adjustHeight()
    };
    _proto._adjustHeight = function() {
        if (!this._hasHeight) {
            this._setGanttViewOption("height", 0);
            this._setGanttViewOption("height", this._treeList._$element.get(0).offsetHeight)
        }
    };
    _proto._getTreeListHeight = function() {
        if (this._$treeList.height()) {
            return this._$treeList.height()
        }
        this._hasHeight = (0, _type.isDefined)(this.option("height")) && "" !== this.option("height");
        return this._hasHeight ? "100%" : ""
    };
    _proto._getTreeListColumns = function() {
        var columns = this.option("columns");
        if (columns) {
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                var isKeyColumn = column.dataField === this.option("".concat(GANTT_TASKS, ".keyExpr")) || column.dataField === this.option("".concat(GANTT_TASKS, ".parentIdExpr"));
                if (isKeyColumn && !column.dataType) {
                    column.dataType = "object"
                }
            }
        }
        return columns
    };
    _proto._onGanttViewSelectionChanged = function(e) {
        this._setTreeListOption("selectedRowKeys", this._getArrayFromOneElement(e.id))
    };
    _proto._onGanttViewScroll = function(e) {
        var treeListScrollable = this._treeList.getScrollable();
        if (treeListScrollable) {
            var diff = e.scrollTop - treeListScrollable.scrollTop();
            if (0 !== diff) {
                treeListScrollable.scrollBy({
                    left: 0,
                    top: diff
                })
            }
        }
    };
    _proto._onTreeListScroll = function(treeListScrollView) {
        var ganttViewTaskAreaContainer = this._ganttView.getTaskAreaContainer();
        if (ganttViewTaskAreaContainer.scrollTop !== treeListScrollView.component.scrollTop()) {
            ganttViewTaskAreaContainer.scrollTop = treeListScrollView.component.scrollTop()
        }
    };
    _proto._expandAll = function() {
        var _this3 = this;
        this._treeList.forEachNode(function(node) {
            if (node.children && node.children.length) {
                _this3._treeList.expandRow(node.key);
                _this3._ganttView.changeTaskExpanded(node.key, true)
            }
        })
    };
    _proto._collapseAll = function() {
        var _this4 = this;
        this._treeList.forEachNode(function(node) {
            if (node.children && node.children.length) {
                _this4._treeList.collapseRow(node.key);
                _this4._ganttView.changeTaskExpanded(node.key, false)
            }
        })
    };
    _proto._initScrollSync = function(treeList) {
        var _this5 = this;
        var treeListScrollable = treeList.getScrollable();
        if (treeListScrollable) {
            treeListScrollable.off("scroll");
            treeListScrollable.on("scroll", function(e) {
                _this5._onTreeListScroll(e)
            })
        }
    };
    _proto._getTreeListRowHeight = function() {
        var $row = this._treeList._$element.find(".dx-data-row");
        var height = $row.length ? (0, _position.getBoundingRect)($row.last().get(0)).height : GANTT_DEFAULT_ROW_HEIGHT;
        if (!height) {
            height = GANTT_DEFAULT_ROW_HEIGHT
        }
        this._correctRowsViewRowHeight(height);
        return height
    };
    _proto._correctRowsViewRowHeight = function(height) {
        var view = this._treeList._views && this._treeList._views.rowsView;
        if ((null === view || void 0 === view ? void 0 : view._rowHeight) !== height) {
            view._rowHeight = height
        }
    };
    _proto._getTreeListHeaderHeight = function() {
        return (0, _position.getBoundingRect)(this._treeList._$element.find(".dx-treelist-headers").get(0)).height
    };
    _proto._setInnerElementsWidth = function(widths) {
        if (!(0, _window.hasWindow)()) {
            return
        }
        if (!widths) {
            widths = this._getPanelsWidthByOption()
        }
        var leftPanelWidth = widths.leftPanelWidth;
        var rightPanelWidth = widths.rightPanelWidth;
        this._$treeListWrapper.width(leftPanelWidth);
        var isPercentage = (0, _type.isString)(leftPanelWidth) && "%" === leftPanelWidth.slice(-1);
        this._setTreeListOption("width", isPercentage ? "100%" : leftPanelWidth);
        this._$ganttView.width(rightPanelWidth);
        this._setGanttViewOption("width", this._$ganttView.width())
    };
    _proto._getPanelsWidthByOption = function() {
        return {
            leftPanelWidth: this.option("taskListWidth"),
            rightPanelWidth: this._$element.width() - this.option("taskListWidth")
        }
    };
    _proto._setGanttViewOption = function(optionName, value) {
        this._ganttView && this._ganttView.option(optionName, value)
    };
    _proto._setTreeListOption = function(optionName, value) {
        this._treeList && this._treeList.option(optionName, value)
    };
    _proto._refreshDataSource = function(name) {
        var _this6 = this;
        var dataOption = this["_".concat(name, "Option")];
        if (dataOption) {
            dataOption._disposeDataSource();
            delete this["_".concat(name, "Option")];
            delete this["_".concat(name)]
        }
        if (this.option("".concat(name, ".dataSource"))) {
            dataOption = new _uiGanttData.default(name, this._getLoadPanel(), function(name, data) {
                _this6._dataSourceChanged(name, data)
            });
            dataOption.option("dataSource", this._getSpecificDataSourceOption(name));
            dataOption._refreshDataSource();
            this["_".concat(name, "Option")] = dataOption
        }
    };
    _proto._getSpecificDataSourceOption = function(name) {
        var dataSource = this.option("".concat(name, ".dataSource"));
        if (Array.isArray(dataSource)) {
            return {
                store: {
                    type: "array",
                    data: dataSource,
                    key: this.option("".concat(name, ".keyExpr"))
                }
            }
        }
        return dataSource
    };
    _proto._compileGettersByOption = function(optionName) {
        var getters = {};
        var optionValue = this.option(optionName);
        for (var field in optionValue) {
            var exprMatches = field.match(/(\w*)Expr/);
            if (exprMatches) {
                getters[exprMatches[1]] = (0, _data.compileGetter)(optionValue[exprMatches[0]])
            }
        }
        return getters
    };
    _proto._compileSettersByOption = function(optionName) {
        var setters = {};
        var optionValue = this.option(optionName);
        for (var field in optionValue) {
            var exprMatches = field.match(/(\w*)Expr/);
            if (exprMatches) {
                setters[exprMatches[1]] = (0, _data.compileSetter)(optionValue[exprMatches[0]])
            }
        }
        return setters
    };
    _proto._getStoreObject = function(optionName, modelObject) {
        var setters = this._compileSettersByOption(optionName);
        return Object.keys(setters).reduce(function(previous, key) {
            if ("key" !== key) {
                setters[key](previous, modelObject[key])
            }
            return previous
        }, {})
    };
    _proto._prepareSetterMapHandler = function(setters) {
        return function(data) {
            return Object.keys(setters).reduce(function(previous, key) {
                var resultKey = "key" === key ? "id" : key;
                setters[key](previous, data[resultKey]);
                return previous
            }, {})
        }
    };
    _proto._prepareMapHandler = function(getters) {
        return function(data) {
            return Object.keys(getters).reduce(function(previous, key) {
                var resultKey = "key" === key ? "id" : key;
                previous[resultKey] = getters[key](data);
                return previous
            }, {})
        }
    };
    _proto._dataSourceChanged = function(dataSourceName, data) {
        var _this7 = this;
        var getters = this._compileGettersByOption(dataSourceName);
        var mappedData = data.map(this._prepareMapHandler(getters));
        this["_".concat(dataSourceName)] = mappedData;
        this._setGanttViewOption(dataSourceName, mappedData);
        if (dataSourceName === GANTT_TASKS) {
            this._tasksRaw = data;
            var expandedRowKeys = data.map(function(t) {
                return t[_this7.option("tasks.parentIdExpr")]
            }).filter(function(value, index, self) {
                return value && self.indexOf(value) === index
            });
            this._setTreeListOption("expandedRowKeys", expandedRowKeys);
            this._setTreeListOption("dataSource", data)
        }
    };
    _proto._createModelChangesListener = function() {
        var _this8 = this;
        return {
            NotifyTaskCreated: function(task, callback, errorCallback) {
                _this8._onRecordInserted(GANTT_TASKS, task, callback)
            },
            NotifyTaskRemoved: function(taskId, errorCallback, task) {
                _this8._onRecordRemoved(GANTT_TASKS, taskId, task)
            },
            NotifyTaskTitleChanged: function(taskId, newValue, errorCallback) {
                _this8._onRecordUpdated(GANTT_TASKS, taskId, "title", newValue)
            },
            NotifyTaskDescriptionChanged: function(taskId, newValue, errorCallback) {
                _this8._onRecordUpdated(GANTT_TASKS, taskId, "description", newValue)
            },
            NotifyTaskStartChanged: function(taskId, newValue, errorCallback) {
                _this8._onRecordUpdated(GANTT_TASKS, taskId, "start", newValue)
            },
            NotifyTaskEndChanged: function(taskId, newValue, errorCallback) {
                _this8._onRecordUpdated(GANTT_TASKS, taskId, "end", newValue)
            },
            NotifyTaskProgressChanged: function(taskId, newValue, errorCallback) {
                _this8._onRecordUpdated(GANTT_TASKS, taskId, "progress", newValue)
            },
            NotifyTaskColorChanged: function(taskId, newValue, errorCallback) {
                _this8._onRecordUpdated(GANTT_TASKS, taskId, "color", newValue)
            },
            NotifyDependencyInserted: function(dependency, callback, errorCallback) {
                _this8._onRecordInserted(GANTT_DEPENDENCIES, dependency, callback)
            },
            NotifyDependencyRemoved: function(dependencyId, errorCallback, dependency) {
                _this8._onRecordRemoved(GANTT_DEPENDENCIES, dependencyId, dependency)
            },
            NotifyResourceCreated: function(resource, callback, errorCallback) {
                _this8._onRecordInserted(GANTT_RESOURCES, resource, callback)
            },
            NotifyResourceRemoved: function(resourceId, errorCallback, resource) {
                _this8._onRecordRemoved(GANTT_RESOURCES, resourceId, resource)
            },
            NotifyResourceAssigned: function(assignment, callback, errorCallback) {
                _this8._onRecordInserted(GANTT_RESOURCE_ASSIGNMENTS, assignment, callback)
            },
            NotifyResourceUnassigned: function(assignmentId, errorCallback, assignment) {
                _this8._onRecordRemoved(GANTT_RESOURCE_ASSIGNMENTS, assignmentId, assignment)
            },
            NotifyParentDataRecalculated: function(data) {
                _this8._onParentTasksRecalculated(data)
            },
            NotifyTaskCreating: function(args) {
                _this8._raiseInsertingAction(GANTT_TASKS, args)
            },
            NotifyTaskRemoving: function(args) {
                _this8._raiseDeletingAction(GANTT_TASKS, args)
            },
            NotifyTaskUpdating: function(args) {
                _this8._raiseUpdatingAction(GANTT_TASKS, args)
            },
            NotifyTaskMoving: function(args) {
                _this8._raiseUpdatingAction(GANTT_TASKS, args, _this8._getTaskMovingAction())
            },
            NotifyTaskEditDialogShowing: function(args) {
                _this8._raiseTaskEditDialogShowingAction(args)
            },
            NotifyDependencyInserting: function(args) {
                _this8._raiseInsertingAction(GANTT_DEPENDENCIES, args)
            },
            NotifyDependencyRemoving: function(args) {
                _this8._raiseDeletingAction(GANTT_DEPENDENCIES, args)
            },
            NotifyResourceCreating: function(args) {
                _this8._raiseInsertingAction(GANTT_RESOURCES, args)
            },
            NotifyResourceRemoving: function(args) {
                _this8._raiseDeletingAction(GANTT_RESOURCES, args)
            },
            NotifyResourceAssigning: function(args) {
                _this8._raiseInsertingAction(GANTT_RESOURCE_ASSIGNMENTS, args)
            },
            NotifyResourceUnassigning: function(args) {
                _this8._raiseDeletingAction(GANTT_RESOURCE_ASSIGNMENTS, args)
            }
        }
    };
    _proto._onRecordInserted = function(optionName, record, callback) {
        var _this9 = this;
        var dataOption = this["_".concat(optionName, "Option")];
        if (dataOption) {
            var data = this._getStoreObject(optionName, record);
            if (optionName === GANTT_TASKS) {
                this._addCustomFieldsDataFromCache(GANTT_NEW_TASK_CACHE_KEY, data)
            }
            dataOption.insert(data, function(response) {
                var keyGetter = (0, _data.compileGetter)(_this9.option("".concat(optionName, ".keyExpr")));
                var insertedId = keyGetter(response);
                callback(insertedId);
                if (optionName === GANTT_TASKS) {
                    _this9._updateTreeListDataSource();
                    var parentId = record.parentId;
                    if (void 0 !== parentId) {
                        var expandedRowKeys = _this9._treeList.option("expandedRowKeys");
                        if (expandedRowKeys.indexOf(parentId) === -1) {
                            expandedRowKeys.push(parentId);
                            _this9._treeList.option("expandedRowKeys", expandedRowKeys)
                        }
                    }
                    _this9._setTreeListOption("selectedRowKeys", _this9._getArrayFromOneElement(insertedId));
                    _this9._setTreeListOption("focusedRowKey", insertedId)
                }
                _this9._raiseInsertedAction(optionName, data, insertedId)
            })
        }
    };
    _proto._onRecordRemoved = function(optionName, key, data) {
        var _this10 = this;
        var dataOption = this["_".concat(optionName, "Option")];
        if (dataOption) {
            dataOption.remove(key, function() {
                if (optionName === GANTT_TASKS) {
                    _this10._updateTreeListDataSource()
                }
                _this10._raiseDeletedAction(optionName, key, _this10._convertCoreToMappedData(optionName, data))
            })
        }
    };
    _proto._onRecordUpdated = function(optionName, key, fieldName, value) {
        var _this11 = this;
        var dataOption = this["_".concat(optionName, "Option")];
        var isTaskUpdated = optionName === GANTT_TASKS;
        if (dataOption) {
            var setter = (0, _data.compileSetter)(this.option("".concat(optionName, ".").concat(fieldName, "Expr")));
            var data = {};
            setter(data, value);
            var hasCustomFieldsData = isTaskUpdated && this._cache.hasData(key);
            if (hasCustomFieldsData) {
                this._addCustomFieldsDataFromCache(key, data)
            }
            dataOption.update(key, data, function() {
                if (isTaskUpdated) {
                    if (hasCustomFieldsData) {
                        dataOption._refreshDataSource()
                    }
                    _this11._updateTreeListDataSource()
                }
                _this11._raiseUpdatedAction(optionName, data, key)
            })
        }
    };
    _proto._onParentTasksRecalculated = function(data) {
        var setters = this._compileSettersByOption(GANTT_TASKS);
        var treeDataSource = this._appendCustomFields(data.map(this._prepareSetterMapHandler(setters)));
        this._setTreeListOption("dataSource", treeDataSource)
    };
    _proto._appendCustomFields = function(data) {
        var modelData = this._tasksOption && this._tasksOption._getItems();
        var keyGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".keyExpr")));
        return data.reduce(function(previous, item) {
            var modelItem = modelData && modelData.filter(function(obj) {
                return keyGetter(obj) === keyGetter(item)
            })[0];
            if (!modelItem) {
                previous.push(item)
            } else {
                var updatedItem = {};
                for (var field in modelItem) {
                    updatedItem[field] = Object.prototype.hasOwnProperty.call(item, field) ? item[field] : modelItem[field]
                }
                previous.push(updatedItem)
            }
            return previous
        }, [])
    };
    _proto._updateTreeListDataSource = function() {
        if (!this._skipUpdateTreeListDataSource()) {
            var dataSource = this.option("tasks.dataSource");
            var storeArray = this._tasksOption._getStore()._array || dataSource.items && dataSource.items();
            this._setTreeListOption("dataSource", storeArray ? storeArray : dataSource)
        }
    };
    _proto._skipUpdateTreeListDataSource = function() {
        return this.option("validation.autoUpdateParentTasks")
    };
    _proto._addCustomFieldsDataFromCache = function(key, data) {
        this._cache.pullDataFromCache(key, data)
    };
    _proto._saveCustomFieldsDataToCache = function(key, data) {
        var _this12 = this;
        var forceUpdateOnKeyExpire = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
        var customFieldsData = this._getCustomFieldsData(data);
        if (Object.keys(customFieldsData).length > 0) {
            var updateCallback = function(key, data) {
                var dataOption = _this12["_".concat(GANTT_TASKS, "Option")];
                if (dataOption && data) {
                    dataOption.update(key, data, function() {
                        _this12._updateTreeListDataSource();
                        dataOption._refreshDataSource()
                    })
                }
            };
            this._cache.saveData(key, customFieldsData, forceUpdateOnKeyExpire ? updateCallback : null)
        }
    };
    _proto._getLoadPanel = function() {
        if (!this._loadPanel) {
            this._loadPanel = this._createComponent(this._$loadPanel, _load_panel.default, {
                position: {
                    of: this.$element()
                }
            })
        }
        return this._loadPanel
    };
    _proto._createSelectionChangedAction = function() {
        this._selectionChangedAction = this._createActionByOption("onSelectionChanged")
    };
    _proto._createTaskClickAction = function() {
        this._taskClickAction = this._createActionByOption("onTaskClick")
    };
    _proto._createTaskDblClickAction = function() {
        this._taskDblClickAction = this._createActionByOption("onTaskDblClick")
    };
    _proto._createCustomCommandAction = function() {
        this._customCommandAction = this._createActionByOption("onCustomCommand")
    };
    _proto._createContextMenuPreparingAction = function() {
        this._contextMenuPreparingAction = this._createActionByOption("onContextMenuPreparing")
    };
    _proto._raiseSelectionChangedAction = function(selectedRowKey) {
        if (!this._selectionChangedAction) {
            this._createSelectionChangedAction()
        }
        this._selectionChangedAction({
            selectedRowKey: selectedRowKey
        })
    };
    _proto._raiseCustomCommand = function(commandName) {
        if (!this._customCommandAction) {
            this._createCustomCommandAction()
        }
        this._customCommandAction({
            name: commandName
        })
    };
    _proto._raiseContextMenuPreparing = function(options) {
        if (!this._contextMenuPreparingAction) {
            this._createContextMenuPreparingAction()
        }
        this._contextMenuPreparingAction(options)
    };
    _proto._raiseInsertingAction = function(optionName, coreArgs) {
        var action = this._getInsertingAction(optionName);
        if (action) {
            var args = {
                cancel: false,
                values: this._convertCoreToMappedData(optionName, coreArgs.values)
            };
            action(args);
            coreArgs.cancel = args.cancel;
            coreArgs.values = this._convertMappedToCoreData(optionName, args.values);
            if (optionName === GANTT_TASKS) {
                this._saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, args.values)
            }
        }
    };
    _proto._raiseInsertedAction = function(optionName, data, key) {
        var action = this._getInsertedAction(optionName);
        if (action) {
            var args = {
                values: data,
                key: key
            };
            action(args)
        }
    };
    _proto._raiseDeletingAction = function(optionName, coreArgs) {
        var action = this._getDeletingAction(optionName);
        if (action) {
            var args = {
                cancel: false,
                key: coreArgs.key,
                values: this._convertCoreToMappedData(optionName, coreArgs.values)
            };
            action(args);
            coreArgs.cancel = args.cancel
        }
    };
    _proto._raiseDeletedAction = function(optionName, key, data) {
        var action = this._getDeletedAction(optionName);
        if (action) {
            var args = {
                key: key,
                values: data
            };
            action(args)
        }
    };
    _proto._raiseUpdatingAction = function(optionName, coreArgs, action) {
        action = action || this._getUpdatingAction(optionName);
        if (action) {
            var args = {
                cancel: false,
                key: coreArgs.key,
                newValues: this._convertCoreToMappedData(optionName, coreArgs.newValues),
                values: this._convertCoreToMappedData(optionName, coreArgs.values)
            };
            action(args);
            coreArgs.cancel = args.cancel;
            coreArgs.newValues = this._convertMappedToCoreData(optionName, args.newValues);
            if (optionName === GANTT_TASKS) {
                this._saveCustomFieldsDataToCache(args.key, args.newValues)
            }
        }
    };
    _proto._raiseUpdatedAction = function(optionName, data, key) {
        var action = this._getUpdatedAction(optionName);
        if (action) {
            var args = {
                values: data,
                key: key
            };
            action(args)
        }
    };
    _proto._raiseTaskEditDialogShowingAction = function(coreArgs) {
        var action = this._getTaskEditDialogShowingAction();
        if (action) {
            var args = {
                cancel: false,
                key: coreArgs.key,
                values: this._convertCoreToMappedData(GANTT_TASKS, coreArgs.values),
                readOnlyFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.readOnlyFields),
                hiddenFields: this._convertCoreToMappedFields(GANTT_TASKS, coreArgs.hiddenFields)
            };
            action(args);
            coreArgs.cancel = args.cancel;
            coreArgs.values = this._convertMappedToCoreData(GANTT_TASKS, args.values);
            coreArgs.readOnlyFields = this._convertMappedToCoreFields(GANTT_TASKS, args.readOnlyFields);
            coreArgs.hiddenFields = this._convertMappedToCoreFields(GANTT_TASKS, args.hiddenFields)
        }
    };
    _proto._raiseTaskClickAction = function(key, event) {
        if (!this._taskClickAction) {
            this._createTaskClickAction()
        }
        var args = {
            key: key,
            event: event,
            data: this.getTaskData(key)
        };
        this._taskClickAction(args)
    };
    _proto._raiseTaskDblClickAction = function(key, event) {
        if (!this._taskDblClickAction) {
            this._createTaskDblClickAction()
        }
        var args = {
            cancel: false,
            data: this.getTaskData(key),
            event: event,
            key: key
        };
        this._taskDblClickAction(args);
        return !args.cancel
    };
    _proto._getInsertingAction = function(optionName) {
        switch (optionName) {
            case GANTT_TASKS:
                return this._getTaskInsertingAction();
            case GANTT_DEPENDENCIES:
                return this._getDependencyInsertingAction();
            case GANTT_RESOURCES:
                return this._getResourceInsertingAction();
            case GANTT_RESOURCE_ASSIGNMENTS:
                return this._getResourceAssigningAction()
        }
        return function() {}
    };
    _proto._getInsertedAction = function(optionName) {
        switch (optionName) {
            case GANTT_TASKS:
                return this._getTaskInsertedAction();
            case GANTT_DEPENDENCIES:
                return this._getDependencyInsertedAction();
            case GANTT_RESOURCES:
                return this._getResourceInsertedAction();
            case GANTT_RESOURCE_ASSIGNMENTS:
                return this._getResourceAssignedAction()
        }
        return function() {}
    };
    _proto._getDeletingAction = function(optionName) {
        switch (optionName) {
            case GANTT_TASKS:
                return this._getTaskDeletingAction();
            case GANTT_DEPENDENCIES:
                return this._getDependencyDeletingAction();
            case GANTT_RESOURCES:
                return this._getResourceDeletingAction();
            case GANTT_RESOURCE_ASSIGNMENTS:
                return this._getResourceUnassigningAction()
        }
        return function() {}
    };
    _proto._getDeletedAction = function(optionName) {
        switch (optionName) {
            case GANTT_TASKS:
                return this._getTaskDeletedAction();
            case GANTT_DEPENDENCIES:
                return this._getDependencyDeletedAction();
            case GANTT_RESOURCES:
                return this._getResourceDeletedAction();
            case GANTT_RESOURCE_ASSIGNMENTS:
                return this._getResourceUnassignedAction()
        }
        return function() {}
    };
    _proto._getUpdatingAction = function(optionName) {
        switch (optionName) {
            case GANTT_TASKS:
                return this._getTaskUpdatingAction()
        }
        return function() {}
    };
    _proto._getUpdatedAction = function(optionName) {
        switch (optionName) {
            case GANTT_TASKS:
                return this._getTaskUpdatedAction()
        }
        return function() {}
    };
    _proto._getTaskInsertingAction = function() {
        if (!this._taskInsertingAction) {
            this._createTaskInsertingAction()
        }
        return this._taskInsertingAction
    };
    _proto._getTaskInsertedAction = function() {
        if (!this._taskInsertedAction) {
            this._createTaskInsertedAction()
        }
        return this._taskInsertedAction
    };
    _proto._getTaskDeletingAction = function() {
        if (!this._taskDeletingAction) {
            this._createTaskDeletingAction()
        }
        return this._taskDeletingAction
    };
    _proto._getTaskDeletedAction = function() {
        if (!this._taskDeletedAction) {
            this._createTaskDeletedAction()
        }
        return this._taskDeletedAction
    };
    _proto._getTaskUpdatingAction = function() {
        if (!this._taskUpdatingAction) {
            this._createTaskUpdatingAction()
        }
        return this._taskUpdatingAction
    };
    _proto._getTaskUpdatedAction = function() {
        if (!this._taskUpdatedAction) {
            this._createTaskUpdatedAction()
        }
        return this._taskUpdatedAction
    };
    _proto._getTaskMovingAction = function() {
        if (!this._taskMovingAction) {
            this._createTaskMovingAction()
        }
        return this._taskMovingAction
    };
    _proto._getTaskEditDialogShowingAction = function() {
        if (!this._taskEditDialogShowingAction) {
            this._createTaskEditDialogShowingAction()
        }
        return this._taskEditDialogShowingAction
    };
    _proto._getDependencyInsertingAction = function() {
        if (!this._dependencyInsertingAction) {
            this._createDependencyInsertingAction()
        }
        return this._dependencyInsertingAction
    };
    _proto._getDependencyInsertedAction = function() {
        if (!this._dependencyInsertedAction) {
            this._createDependencyInsertedAction()
        }
        return this._dependencyInsertedAction
    };
    _proto._getDependencyDeletingAction = function() {
        if (!this._dependencyDeletingAction) {
            this._createDependencyDeletingAction()
        }
        return this._dependencyDeletingAction
    };
    _proto._getDependencyDeletedAction = function() {
        if (!this._dependencyDeletedAction) {
            this._createDependencyDeletedAction()
        }
        return this._dependencyDeletedAction
    };
    _proto._getResourceInsertingAction = function() {
        if (!this._resourceInsertingAction) {
            this._createResourceInsertingAction()
        }
        return this._resourceInsertingAction
    };
    _proto._getResourceInsertedAction = function() {
        if (!this._resourceInsertedAction) {
            this._createResourceInsertedAction()
        }
        return this._resourceInsertedAction
    };
    _proto._getResourceDeletingAction = function() {
        if (!this._resourceDeletingAction) {
            this._createResourceDeletingAction()
        }
        return this._resourceDeletingAction
    };
    _proto._getResourceDeletedAction = function() {
        if (!this._resourceDeletedAction) {
            this._createResourceDeletedAction()
        }
        return this._resourceDeletedAction
    };
    _proto._getResourceAssigningAction = function() {
        if (!this._resourceAssigningAction) {
            this._createResourceAssigningAction()
        }
        return this._resourceAssigningAction
    };
    _proto._getResourceAssignedAction = function() {
        if (!this._resourceAssignedAction) {
            this._createResourceAssignedAction()
        }
        return this._resourceAssignedAction
    };
    _proto._getResourceUnassigningAction = function() {
        if (!this._resourceUnassigningAction) {
            this._createResourceUnassigningAction()
        }
        return this._resourceUnassigningAction
    };
    _proto._getResourceUnassignedAction = function() {
        if (!this._resourceUnassignedAction) {
            this._createResourceUnassignedAction()
        }
        return this._resourceUnassignedAction
    };
    _proto._createResourceUnassigningAction = function() {
        this._resourceUnassigningAction = this._createActionByOption("onResourceUnassigning")
    };
    _proto._createResourceUnassignedAction = function() {
        this._resourceUnassignedAction = this._createActionByOption("onResourceUnassigned")
    };
    _proto._createTaskInsertingAction = function() {
        this._taskInsertingAction = this._createActionByOption("onTaskInserting")
    };
    _proto._createTaskInsertedAction = function() {
        this._taskInsertedAction = this._createActionByOption("onTaskInserted")
    };
    _proto._createTaskDeletingAction = function() {
        this._taskDeletingAction = this._createActionByOption("onTaskDeleting")
    };
    _proto._createTaskDeletedAction = function() {
        this._taskDeletedAction = this._createActionByOption("onTaskDeleted")
    };
    _proto._createTaskUpdatingAction = function() {
        this._taskUpdatingAction = this._createActionByOption("onTaskUpdating");
    };
    _proto._createTaskUpdatedAction = function() {
        this._taskUpdatedAction = this._createActionByOption("onTaskUpdated")
    };
    _proto._createTaskMovingAction = function() {
        this._taskMovingAction = this._createActionByOption("onTaskMoving")
    };
    _proto._createTaskEditDialogShowingAction = function() {
        this._taskEditDialogShowingAction = this._createActionByOption("onTaskEditDialogShowing")
    };
    _proto._createDependencyInsertingAction = function() {
        this._dependencyInsertingAction = this._createActionByOption("onDependencyInserting")
    };
    _proto._createDependencyInsertedAction = function() {
        this._dependencyInsertedAction = this._createActionByOption("onDependencyInserted")
    };
    _proto._createDependencyDeletingAction = function() {
        this._dependencyDeletingAction = this._createActionByOption("onDependencyDeleting")
    };
    _proto._createDependencyDeletedAction = function() {
        this._dependencyDeletedAction = this._createActionByOption("onDependencyDeleted")
    };
    _proto._createResourceInsertingAction = function() {
        this._resourceInsertingAction = this._createActionByOption("onResourceInserting")
    };
    _proto._createResourceInsertedAction = function() {
        this._resourceInsertedAction = this._createActionByOption("onResourceInserted")
    };
    _proto._createResourceDeletingAction = function() {
        this._resourceDeletingAction = this._createActionByOption("onResourceDeleting")
    };
    _proto._createResourceDeletedAction = function() {
        this._resourceDeletedAction = this._createActionByOption("onResourceDeleted")
    };
    _proto._createResourceAssigningAction = function() {
        this._resourceAssigningAction = this._createActionByOption("onResourceAssigning")
    };
    _proto._createResourceAssignedAction = function() {
        this._resourceAssignedAction = this._createActionByOption("onResourceAssigned")
    };
    _proto._convertCoreToMappedData = function(optionName, coreData) {
        var _this13 = this;
        return Object.keys(coreData).reduce(function(previous, f) {
            var mappedField = _this13._getMappedFieldName(optionName, f);
            if (mappedField) {
                var setter = (0, _data.compileSetter)(mappedField);
                setter(previous, coreData[f])
            }
            return previous
        }, {})
    };
    _proto._convertMappedToCoreData = function(optionName, mappedData) {
        var coreData = {};
        if (mappedData) {
            var mappedFields = this.option(optionName);
            for (var field in mappedFields) {
                var exprMatches = field.match(GANTT_MAPPED_FIELD_REGEX);
                var mappedFieldName = exprMatches && mappedFields[exprMatches[0]];
                if (mappedFieldName && void 0 !== mappedData[mappedFieldName]) {
                    var getter = (0, _data.compileGetter)(mappedFieldName);
                    var coreFieldName = exprMatches[1];
                    coreData[coreFieldName] = getter(mappedData)
                }
            }
        }
        return coreData
    };
    _proto._getMappedFieldName = function(optionName, coreField) {
        var coreFieldName = coreField;
        if ("id" === coreField) {
            coreFieldName = "key"
        }
        return this.option("".concat(optionName, ".").concat(coreFieldName, "Expr"))
    };
    _proto._convertCoreToMappedFields = function(optionName, fields) {
        var _this14 = this;
        return fields.reduce(function(previous, f) {
            var mappedField = _this14._getMappedFieldName(optionName, f);
            if (mappedField) {
                previous.push(mappedField)
            }
            return previous
        }, [])
    };
    _proto._convertMappedToCoreFields = function(optionName, fields) {
        var coreFields = [];
        var mappedFields = this.option(optionName);
        for (var field in mappedFields) {
            var exprMatches = field.match(GANTT_MAPPED_FIELD_REGEX);
            var mappedFieldName = exprMatches && mappedFields[exprMatches[0]];
            if (mappedFieldName && fields.indexOf(mappedFieldName) > -1) {
                var coreFieldName = exprMatches[1];
                coreFields.push(coreFieldName)
            }
        }
        return coreFields
    };
    _proto._getTaskMappedFieldNames = function() {
        var mappedFields = [];
        var mappedFieldsData = this.option(GANTT_TASKS);
        for (var field in mappedFieldsData) {
            var exprMatches = field.match(GANTT_MAPPED_FIELD_REGEX);
            var mappedFieldName = exprMatches && mappedFieldsData[exprMatches[0]];
            if (mappedFieldName) {
                mappedFields.push(mappedFieldName)
            }
        }
        return mappedFields
    };
    _proto._getTaskCustomFields = function() {
        var columns = this.option("columns");
        var columnFields = columns && columns.map(function(c) {
            return c.dataField
        });
        var mappedFields = this._getTaskMappedFieldNames();
        return columnFields ? columnFields.filter(function(f) {
            return mappedFields.indexOf(f) < 0
        }) : []
    };
    _proto._getCustomFieldsData = function(data) {
        return this._getTaskCustomFields().reduce(function(previous, field) {
            if (data && void 0 !== data[field]) {
                previous[field] = data[field]
            }
            return previous
        }, {})
    };
    _proto._addCustomFieldsData = function(key, data) {
        if (data) {
            var modelData = this._tasksOption && this._tasksOption._getItems();
            var keyGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".keyExpr")));
            var modelItem = modelData && modelData.filter(function(obj) {
                return keyGetter(obj) === key
            })[0];
            var customFields = this._getTaskCustomFields();
            for (var i = 0; i < customFields.length; i++) {
                var field = customFields[i];
                if (Object.prototype.hasOwnProperty.call(modelItem, field)) {
                    data[field] = modelItem[field]
                }
            }
        }
    };
    _proto._getSelectionMode = function(allowSelection) {
        return allowSelection ? "single" : "none"
    };
    _proto._getArrayFromOneElement = function(element) {
        return void 0 === element || null === element ? [] : [element]
    };
    _proto._getToolbarItems = function() {
        var items = this.option("toolbar.items");
        return items ? items : []
    };
    _proto._updateToolbarContent = function() {
        var items = this._getToolbarItems();
        if (items.length) {
            this._$toolbarWrapper.show()
        } else {
            this._$toolbarWrapper.hide()
        }
        this._toolbar && this._toolbar.createItems(items);
        this._updateBarItemsState()
    };
    _proto._updateContextMenu = function() {
        var contextMenuOptions = this.option("contextMenu");
        if (contextMenuOptions.enabled && this._contextMenuBar) {
            this._contextMenuBar.createItems(contextMenuOptions.items);
            this._updateBarItemsState()
        }
    };
    _proto._updateBarItemsState = function() {
        this._ganttView && this._ganttView.updateBarItemsState()
    };
    _proto._showDialog = function(e) {
        if (!this._dialogInstance) {
            this._dialogInstance = new _uiGantt3.GanttDialog(this, this._$dialog)
        }
        this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option("editing"))
    };
    _proto._showPopupMenu = function(info) {
        if (this.option("contextMenu.enabled")) {
            this._ganttView.getBarManager().updateContextMenu();
            var args = {
                cancel: false,
                event: info.event,
                targetType: info.type,
                targetKey: info.key,
                items: (0, _extend.extend)(true, [], this._contextMenuBar._items),
                data: "task" === info.type ? this.getTaskData(info.key) : this.getDependencyData(info.key)
            };
            this._raiseContextMenuPreparing(args);
            if (!args.cancel) {
                this._contextMenuBar.show(info.position, args.items)
            }
        }
    };
    _proto._executeCoreCommand = function(id) {
        this._ganttView.executeCoreCommand(id)
    };
    _proto._clean = function() {
        var _this$_ganttView3;
        null === (_this$_ganttView3 = this._ganttView) || void 0 === _this$_ganttView3 ? void 0 : _this$_ganttView3._ganttViewCore.cleanMarkup();
        delete this._ganttView;
        delete this._dialogInstance;
        _Widget.prototype._clean.call(this)
    };
    _proto._getTaskTooltipContentTemplateFunc = function(taskTooltipContentTemplateOption) {
        var _this15 = this;
        var isTooltipShowing = true;
        var template = taskTooltipContentTemplateOption && this._getTemplate(taskTooltipContentTemplateOption);
        var createTemplateFunction = template && function(container, item) {
            template.render({
                model: _this15.getTaskDataByCoreData(item),
                container: (0, _element.getPublicElement)((0, _renderer.default)(container))
            });
            return isTooltipShowing
        };
        return createTemplateFunction
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            tasks: {
                dataSource: null,
                keyExpr: "id",
                parentIdExpr: "parentId",
                startExpr: "start",
                endExpr: "end",
                progressExpr: "progress",
                titleExpr: "title",
                colorExpr: "color"
            },
            dependencies: {
                dataSource: null,
                keyExpr: "id",
                predecessorIdExpr: "predecessorId",
                successorIdExpr: "successorId",
                typeExpr: "type"
            },
            resources: {
                dataSource: null,
                keyExpr: "id",
                textExpr: "text",
                colorExpr: "color"
            },
            resourceAssignments: {
                dataSource: null,
                keyExpr: "id",
                taskIdExpr: "taskId",
                resourceIdExpr: "resourceId"
            },
            columns: void 0,
            taskListWidth: 300,
            showResources: true,
            taskTitlePosition: "inside",
            firstDayOfWeek: void 0,
            selectedRowKey: void 0,
            onSelectionChanged: null,
            onTaskClick: null,
            onTaskDblClick: null,
            onTaskInserting: null,
            onTaskInserted: null,
            onTaskDeleting: null,
            onTaskDeleted: null,
            onTaskUpdating: null,
            onTaskUpdated: null,
            onTaskMoving: null,
            onTaskEditDialogShowing: null,
            onDependencyInserting: null,
            onDependencyInserted: null,
            onDependencyDeleting: null,
            onDependencyDeleted: null,
            onResourceInserting: null,
            onResourceInserted: null,
            onResourceDeleting: null,
            onResourceDeleted: null,
            onResourceAssigning: null,
            onResourceAssigned: null,
            onResourceUnassigning: null,
            onResourceUnassigned: null,
            onCustomCommand: null,
            onContextMenuPreparing: null,
            allowSelection: true,
            showRowLines: true,
            stripLines: void 0,
            scaleType: "auto",
            editing: {
                enabled: false,
                allowTaskAdding: true,
                allowTaskDeleting: true,
                allowTaskUpdating: true,
                allowDependencyAdding: true,
                allowDependencyDeleting: true,
                allowResourceAdding: true,
                allowResourceDeleting: true,
                allowResourceUpdating: true,
                allowTaskResourceUpdating: true
            },
            validation: {
                validateDependencies: false,
                autoUpdateParentTasks: false
            },
            toolbar: null,
            contextMenu: {
                enabled: true,
                items: void 0
            },
            taskTooltipContentTemplate: null,
            rootValue: 0
        })
    };
    _proto.getTaskResources = function(key) {
        var _this16 = this;
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        var coreData = this._ganttView._ganttViewCore.getTaskResources(key);
        return coreData.map(function(r) {
            return _this16._convertCoreToMappedData(GANTT_RESOURCES, r)
        })
    };
    _proto.getVisibleTaskKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleTaskKeys()
    };
    _proto.getVisibleDependencyKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleDependencyKeys()
    };
    _proto.getVisibleResourceKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleResourceKeys()
    };
    _proto.getVisibleResourceAssignmentKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleResourceAssignmentKeys()
    };
    _proto.getTaskData = function(key) {
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        var coreData = this._ganttView._ganttViewCore.getTaskData(key);
        var mappedData = this.getTaskDataByCoreData(coreData);
        return mappedData
    };
    _proto.getTaskDataByCoreData = function(coreData) {
        var mappedData = coreData ? this._convertCoreToMappedData(GANTT_TASKS, coreData) : null;
        this._addCustomFieldsData(coreData.id, mappedData);
        return mappedData
    };
    _proto.insertTask = function(data) {
        this._saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, data);
        this._ganttView._ganttViewCore.insertTask(this._convertMappedToCoreData(GANTT_TASKS, data))
    };
    _proto.deleteTask = function(key) {
        this._ganttView._ganttViewCore.deleteTask(key)
    };
    _proto.updateTask = function(key, data) {
        this._saveCustomFieldsDataToCache(key, data, true);
        this._ganttView._ganttViewCore.updateTask(key, this._convertMappedToCoreData(GANTT_TASKS, data))
    };
    _proto.getDependencyData = function(key) {
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        var coreData = this._ganttView._ganttViewCore.getDependencyData(key);
        return coreData ? this._convertCoreToMappedData(GANTT_DEPENDENCIES, coreData) : null
    };
    _proto.insertDependency = function(data) {
        this._ganttView._ganttViewCore.insertDependency(this._convertMappedToCoreData(GANTT_DEPENDENCIES, data))
    };
    _proto.deleteDependency = function(key) {
        this._ganttView._ganttViewCore.deleteDependency(key)
    };
    _proto.getResourceData = function(key) {
        var coreData = this._ganttView._ganttViewCore.getResourceData(key);
        return coreData ? this._convertCoreToMappedData(GANTT_RESOURCES, coreData) : null
    };
    _proto.deleteResource = function(key) {
        this._ganttView._ganttViewCore.deleteResource(key)
    };
    _proto.insertResource = function(data, taskKeys) {
        this._ganttView._ganttViewCore.insertResource(this._convertMappedToCoreData(GANTT_RESOURCES, data), taskKeys)
    };
    _proto.getResourceAssignmentData = function(key) {
        var coreData = this._ganttView._ganttViewCore.getResourceAssignmentData(key);
        return coreData ? this._convertCoreToMappedData(GANTT_RESOURCE_ASSIGNMENTS, coreData) : null
    };
    _proto.assignResourceToTask = function(resourceKey, taskKey) {
        this._ganttView._ganttViewCore.assignResourceToTask(resourceKey, taskKey)
    };
    _proto.unassignResourceFromTask = function(resourceKey, taskKey) {
        this._ganttView._ganttViewCore.unassignResourceFromTask(resourceKey, taskKey)
    };
    _proto.updateDimensions = function() {
        this._setInnerElementsWidth()
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "tasks":
                this._refreshDataSource(GANTT_TASKS);
                break;
            case "dependencies":
                this._refreshDataSource(GANTT_DEPENDENCIES);
                break;
            case "resources":
                this._refreshDataSource(GANTT_RESOURCES);
                break;
            case "resourceAssignments":
                this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
                break;
            case "columns":
                this._setTreeListOption("columns", this._getTreeListColumns());
                break;
            case "taskListWidth":
                this._setInnerElementsWidth();
                break;
            case "showResources":
                this._setGanttViewOption("showResources", args.value);
                break;
            case "taskTitlePosition":
                this._setGanttViewOption("taskTitlePosition", args.value);
                break;
            case "firstDayOfWeek":
                this._setGanttViewOption("firstDayOfWeek", args.value);
                break;
            case "selectedRowKey":
                this._setTreeListOption("selectedRowKeys", this._getArrayFromOneElement(args.value));
                break;
            case "onSelectionChanged":
                this._createSelectionChangedAction();
                break;
            case "onTaskClick":
                this._createTaskClickAction();
                break;
            case "onTaskDblClick":
                this._createTaskDblClickAction();
                break;
            case "onTaskInserting":
                this._createTaskInsertingAction();
                break;
            case "onTaskInserted":
                this._createTaskInsertedAction();
                break;
            case "onTaskDeleting":
                this._createTaskDeletingAction();
                break;
            case "onTaskDeleted":
                this._createTaskDeletedAction();
                break;
            case "onTaskUpdating":
                this._createTaskUpdatingAction();
                break;
            case "onTaskUpdated":
                this._createTaskUpdatedAction();
                break;
            case "onTaskMoving":
                this._createTaskMovingAction();
                break;
            case "onTaskEditDialogShowing":
                this._createTaskEditDialogShowingAction();
                break;
            case "onDependencyInserting":
                this._createDependencyInsertingAction();
                break;
            case "onDependencyInserted":
                this._createDependencyInsertedAction();
                break;
            case "onDependencyDeleting":
                this._createDependencyDeletingAction();
                break;
            case "onDependencyDeleted":
                this._createDependencyDeletedAction();
                break;
            case "onResourceInserting":
                this._createResourceInsertingAction();
                break;
            case "onResourceInserted":
                this._createResourceInsertedAction();
                break;
            case "onResourceDeleting":
                this._createResourceDeletingAction();
                break;
            case "onResourceDeleted":
                this._createResourceDeletedAction();
                break;
            case "onResourceAssigning":
                this._createResourceAssigningAction();
                break;
            case "onResourceAssigned":
                this._createResourceAssignedAction();
                break;
            case "onResourceUnassigning":
                this._createResourceUnassigningAction();
                break;
            case "onResourceUnassigned":
                this._createResourceUnassignedAction();
                break;
            case "onCustomCommand":
                this._createCustomCommandAction();
                break;
            case "onContextMenuPreparing":
                this._createContextMenuPreparingAction();
                break;
            case "allowSelection":
                this._setTreeListOption("selection.mode", this._getSelectionMode(args.value));
                this._setGanttViewOption("allowSelection", args.value);
                break;
            case "showRowLines":
                this._setTreeListOption("showRowLines", args.value);
                this._setGanttViewOption("showRowLines", args.value);
                break;
            case "stripLines":
                this._setGanttViewOption("stripLines", args.value);
                break;
            case "scaleType":
                this._setGanttViewOption("scaleType", args.value);
                break;
            case "editing":
                this._setGanttViewOption("editing", this.option(args.name));
                break;
            case "validation":
                this._setGanttViewOption("validation", this.option(args.name));
                break;
            case "toolbar":
                this._updateToolbarContent();
                break;
            case "contextMenu":
                this._updateContextMenu();
                break;
            case "taskTooltipContentTemplate":
                this._setGanttViewOption("taskTooltipContentTemplate", this._getTaskTooltipContentTemplateFunc(args.value));
                break;
            case "rootValue":
                this._setTreeListOption("rootValue", args.value);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    return Gantt
}(_ui.default);
(0, _component_registrator.default)("dxGantt", Gantt);
var _default = Gantt;
exports.default = _default;
module.exports = exports.default;
