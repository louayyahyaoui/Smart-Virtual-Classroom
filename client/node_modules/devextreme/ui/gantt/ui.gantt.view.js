/**
 * DevExtreme (ui/gantt/ui.gantt.view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GanttView = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _gantt_importer = require("./gantt_importer");
var _uiGanttTaskArea = require("./ui.gantt.task.area.container");
var _date = _interopRequireDefault(require("../../localization/date"));
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
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
var GanttView = function(_Widget) {
    _inheritsLoose(GanttView, _Widget);

    function GanttView() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = GanttView.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this._onSelectionChanged = this._createActionByOption("onSelectionChanged");
        this._onScroll = this._createActionByOption("onScroll");
        this._onDialogShowing = this._createActionByOption("onDialogShowing");
        this._onPopupMenuShowing = this._createActionByOption("onPopupMenuShowing");
        this._expandAll = this._createActionByOption("onExpandAll");
        this._collapseAll = this._createActionByOption("onCollapseAll");
        this._taskClick = this._createActionByOption("onTaskClick");
        this._taskDblClick = this._createActionByOption("onTaskDblClick");
        this._onAdjustControl = this._createActionByOption("onAdjustControl")
    };
    _proto._initMarkup = function() {
        var _GanttView = (0, _gantt_importer.getGanttViewCore)();
        this._ganttViewCore = new _GanttView(this.$element().get(0), this, {
            showResources: this.option("showResources"),
            taskTitlePosition: this._getTaskTitlePosition(this.option("taskTitlePosition")),
            firstDayOfWeek: this._getFirstDayOfWeek(this.option("firstDayOfWeek")),
            allowSelectTask: this.option("allowSelection"),
            editing: this._parseEditingSettings(this.option("editing")),
            validation: this.option("validation"),
            stripLines: {
                stripLines: this.option("stripLines")
            },
            areHorizontalBordersEnabled: this.option("showRowLines"),
            areAlternateRowsEnabled: false,
            viewType: this._getViewTypeByScaleType(this.option("scaleType")),
            cultureInfo: this._getCultureInfo(),
            taskTooltipContentTemplate: this.option("taskTooltipContentTemplate")
        });
        this._selectTask(this.option("selectedRowKey"));
        this.updateBarItemsState()
    };
    _proto._getFirstDayOfWeek = function(value) {
        return (0, _type.isDefined)(value) ? value : _date.default.firstDayOfWeekIndex()
    };
    _proto.getTaskAreaContainer = function() {
        return this._ganttViewCore.taskAreaContainer
    };
    _proto.getBarManager = function() {
        return this._ganttViewCore.barManager
    };
    _proto.executeCoreCommand = function(id) {
        var command = this._ganttViewCore.commandManager.getCommand(id);
        if (command) {
            command.execute()
        }
    };
    _proto.changeTaskExpanded = function(id, value) {
        this._ganttViewCore.changeTaskExpanded(id, value)
    };
    _proto.updateView = function() {
        this._ganttViewCore.updateView()
    };
    _proto.updateBarItemsState = function() {
        this._ganttViewCore.barManager.updateItemsState([])
    };
    _proto.setWidth = function(value) {
        this._ganttViewCore.setWidth(value)
    };
    _proto._selectTask = function(id) {
        this._ganttViewCore.selectTaskById(id)
    };
    _proto._update = function() {
        this._ganttViewCore.loadOptionsFromGanttOwner();
        this._ganttViewCore.resetAndUpdate()
    };
    _proto._getCultureInfo = function() {
        return {
            monthNames: _date.default.getMonthNames("wide"),
            dayNames: _date.default.getDayNames("wide"),
            abbrMonthNames: _date.default.getMonthNames("abbreviated"),
            abbrDayNames: _date.default.getDayNames("abbreviated"),
            quarterNames: _date.default.getQuarterNames(),
            amText: _date.default.getPeriodNames()[0],
            pmText: _date.default.getPeriodNames()[1]
        }
    };
    _proto._getTaskTitlePosition = function(value) {
        switch (value) {
            case "outside":
                return 1;
            case "none":
                return 2;
            default:
                return 0
        }
    };
    _proto._getViewTypeByScaleType = function(scaleType) {
        switch (scaleType) {
            case "minutes":
                return 0;
            case "hours":
                return 1;
            case "days":
                return 3;
            case "weeks":
                return 4;
            case "months":
                return 5;
            case "quarters":
                return 6;
            case "years":
                return 7;
            default:
                return
        }
    };
    _proto._parseEditingSettings = function(value) {
        return {
            enabled: value.enabled,
            allowDependencyDelete: value.allowDependencyDeleting,
            allowDependencyInsert: value.allowDependencyAdding,
            allowTaskDelete: value.allowTaskDeleting,
            allowTaskInsert: value.allowTaskAdding,
            allowTaskUpdate: value.allowTaskUpdating,
            allowResourceDelete: value.allowResourceDeleting,
            allowResourceInsert: value.allowResourceAdding,
            allowResourceUpdate: value.allowResourceUpdating,
            allowTaskResourceUpdate: value.allowTaskResourceUpdating
        }
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "width":
                _Widget.prototype._optionChanged.call(this, args);
                this._ganttViewCore.setWidth(args.value);
                break;
            case "height":
                this._ganttViewCore.setHeight(args.value);
                break;
            case "tasks":
            case "dependencies":
            case "resources":
            case "resourceAssignments":
                this._update();
                break;
            case "showResources":
                this._ganttViewCore.setShowResources(args.value);
                break;
            case "taskTitlePosition":
                this._ganttViewCore.setTaskTitlePosition(this._getTaskTitlePosition(args.value));
                break;
            case "firstDayOfWeek":
                this._ganttViewCore.setFirstDayOfWeek(this._getFirstDayOfWeek(args.value));
                break;
            case "allowSelection":
                this._ganttViewCore.setAllowSelection(args.value);
                break;
            case "selectedRowKey":
                this._selectTask(args.value);
                break;
            case "editing":
                this._ganttViewCore.setEditingSettings(this._parseEditingSettings(args.value));
                break;
            case "validation":
                this._ganttViewCore.setValidationSettings(args.value);
                this._update();
                break;
            case "showRowLines":
                this._ganttViewCore.setRowLinesVisible(args.value);
                break;
            case "scaleType":
                this._ganttViewCore.setViewType(this._getViewTypeByScaleType(args.value));
                break;
            case "stripLines":
                this._ganttViewCore.setStripLines({
                    stripLines: args.value
                });
                break;
            case "taskTooltipContentTemplate":
                this._ganttViewCore.setTaskTooltipContentTemplate(args.value);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto.getRowHeight = function() {
        return this.option("rowHeight")
    };
    _proto.getHeaderHeight = function() {
        return this.option("headerHeight")
    };
    _proto.getGanttTasksData = function() {
        return this.option("tasks")
    };
    _proto.getGanttDependenciesData = function() {
        return this.option("dependencies")
    };
    _proto.getGanttResourcesData = function() {
        return this.option("resources")
    };
    _proto.getGanttResourceAssignmentsData = function() {
        return this.option("resourceAssignments")
    };
    _proto.getGanttWorkTimeRules = function() {
        return {}
    };
    _proto.getExternalTaskAreaContainer = function(element) {
        if (!this._taskAreaContainer) {
            this._taskAreaContainer = new _uiGanttTaskArea.TaskAreaContainer(element, this)
        }
        return this._taskAreaContainer
    };
    _proto.changeGanttTaskSelection = function(id, selected) {
        this._onSelectionChanged({
            id: id,
            selected: selected
        })
    };
    _proto.onGanttScroll = function(scrollTop) {
        this._onScroll({
            scrollTop: scrollTop
        })
    };
    _proto.showDialog = function(name, parameters, callback, afterClosing) {
        this._onDialogShowing({
            name: name,
            parameters: parameters,
            callback: callback,
            afterClosing: afterClosing
        })
    };
    _proto.getModelChangesListener = function() {
        return this.option("modelChangesListener")
    };
    _proto.showPopupMenu = function(info) {
        this._onPopupMenuShowing(info)
    };
    _proto.getMainElement = function() {
        return this.option("mainElement").get(0)
    };
    _proto.adjustControl = function() {
        this._onAdjustControl()
    };
    _proto.getRequireFirstLoadParentAutoCalc = function() {
        return this.option("validation.autoUpdateParentTasks")
    };
    _proto.collapseAll = function() {
        this._collapseAll()
    };
    _proto.expandAll = function() {
        this._expandAll()
    };
    _proto.onTaskClick = function(key, event) {
        this._taskClick({
            key: key,
            event: event
        });
        return true
    };
    _proto.onTaskDblClick = function(key, event) {
        return this._taskDblClick({
            key: key,
            event: event
        })
    };
    _proto.onGanttViewContextMenu = function(event, key, type) {
        return true
    };
    _proto.getFormattedDateText = function(date) {
        var result = "";
        if (date) {
            var datePart = _date.default.format(date, "shortDate");
            var timePart = _date.default.format(date, "hh:mm");
            result = datePart + " " + timePart
        }
        return result
    };
    _proto.destroyTemplate = function(container) {
        (0, _renderer.default)(container).empty()
    };
    _createClass(GanttView, [{
        key: "bars",
        get: function() {
            return this.option("bars")
        }
    }]);
    return GanttView
}(_ui.default);
exports.GanttView = GanttView;
