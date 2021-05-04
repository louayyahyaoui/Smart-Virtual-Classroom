/**
 * DevExtreme (ui/calendar/ui.calendar.base_view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _element_data = require("../../core/element_data");
var _element = require("../../core/element");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _index = require("../../events/utils/index");
var _click = require("../../events/click");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _ui.default.abstract;
var CALENDAR_OTHER_VIEW_CLASS = "dx-calendar-other-view";
var CALENDAR_CELL_CLASS = "dx-calendar-cell";
var CALENDAR_EMPTY_CELL_CLASS = "dx-calendar-empty-cell";
var CALENDAR_TODAY_CLASS = "dx-calendar-today";
var CALENDAR_SELECTED_DATE_CLASS = "dx-calendar-selected-date";
var CALENDAR_CONTOURED_DATE_CLASS = "dx-calendar-contoured-date";
var CALENDAR_DXCLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, "dxCalendar");
var CALENDAR_DATE_VALUE_KEY = "dxDateValueKey";
var BaseView = _ui.default.inherit({
    _getViewName: function() {
        return "base"
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            date: new Date,
            focusStateEnabled: false,
            cellTemplate: null,
            disabledDates: null,
            onCellClick: null,
            rowCount: 3,
            colCount: 4,
            allowValueSelection: true,
            _todayDate: function() {
                return new Date
            }
        })
    },
    _init: function() {
        this.callBase();
        var value = this.option("value");
        this.option("value", new Date(value));
        if (!this.option("value").valueOf()) {
            this.option("value", new Date(0, 0, 0, 0, 0, 0))
        }
    },
    _initMarkup: function() {
        this.callBase();
        this._renderImpl()
    },
    _renderImpl: function() {
        this.$element().append(this._createTable());
        this._createDisabledDatesHandler();
        this._renderBody();
        this._renderContouredDate();
        this._renderValue();
        this._renderEvents()
    },
    _createTable: function() {
        this._$table = (0, _renderer.default)("<table>");
        this.setAria({
            label: _message.default.format("dxCalendar-ariaWidgetName"),
            role: "grid"
        }, this._$table);
        return this._$table
    },
    _renderBody: function() {
        this.$body = (0, _renderer.default)("<tbody>").appendTo(this._$table);
        var rowData = {
            cellDate: this._getFirstCellData(),
            prevCellDate: null
        };
        for (var rowIndex = 0, rowCount = this.option("rowCount"); rowIndex < rowCount; rowIndex++) {
            rowData.row = this._createRow();
            for (var colIndex = 0, colCount = this.option("colCount"); colIndex < colCount; colIndex++) {
                this._renderCell(rowData, colIndex)
            }
        }
    },
    _createRow: function() {
        var row = _dom_adapter.default.createElement("tr");
        this.setAria("role", "row", (0, _renderer.default)(row));
        this.$body.get(0).appendChild(row);
        return row
    },
    _appendCell: function(row, cell) {
        if (!this._appendMethodName) {
            this._cacheAppendMethodName()
        }(0, _renderer.default)(row)[this._appendMethodName](cell)
    },
    _cacheAppendMethodName: function(rtlEnabled) {
        this._appendMethodName = (null !== rtlEnabled && void 0 !== rtlEnabled ? rtlEnabled : this.option("rtlEnabled")) ? "prepend" : "append"
    },
    _createCell: function(cellDate) {
        var cell = _dom_adapter.default.createElement("td");
        var $cell = (0, _renderer.default)(cell);
        cell.className = this._getClassNameByDate(cellDate);
        cell.setAttribute("data-value", _date_serialization.default.serializeDate(cellDate, _date.default.getShortDateFormat()));
        (0, _element_data.data)(cell, CALENDAR_DATE_VALUE_KEY, cellDate);
        this.setAria({
            role: "gridcell",
            label: this.getCellAriaLabel(cellDate)
        }, $cell);
        return {
            cell: cell,
            $cell: $cell
        }
    },
    _renderCell: function(params, cellIndex) {
        var cellDate = params.cellDate,
            prevCellDate = params.prevCellDate,
            row = params.row;
        if (prevCellDate) {
            _date.default.fixTimezoneGap(prevCellDate, cellDate)
        }
        params.prevCellDate = cellDate;
        var _this$_createCell = this._createCell(cellDate),
            cell = _this$_createCell.cell,
            $cell = _this$_createCell.$cell;
        var cellTemplate = this.option("cellTemplate");
        this._appendCell(row, cell);
        if (cellTemplate) {
            cellTemplate.render(this._prepareCellTemplateData(cellDate, cellIndex, $cell))
        } else {
            cell.innerHTML = this._getCellText(cellDate)
        }
        params.cellDate = this._getNextCellData(cellDate)
    },
    _getClassNameByDate: function(cellDate) {
        var className = CALENDAR_CELL_CLASS;
        if (this._isTodayCell(cellDate)) {
            className += " ".concat(CALENDAR_TODAY_CLASS)
        }
        if (this._isDateOutOfRange(cellDate) || this.isDateDisabled(cellDate)) {
            className += " ".concat(CALENDAR_EMPTY_CELL_CLASS)
        }
        if (this._isOtherView(cellDate)) {
            className += " ".concat(CALENDAR_OTHER_VIEW_CLASS)
        }
        return className
    },
    _prepareCellTemplateData: function(cellDate, cellIndex, $cell) {
        return {
            model: {
                text: this._getCellText(cellDate),
                date: cellDate,
                view: this._getViewName()
            },
            container: (0, _element.getPublicElement)($cell),
            index: cellIndex
        }
    },
    _renderEvents: function() {
        var _this = this;
        this._createCellClickAction();
        _events_engine.default.off(this._$table, CALENDAR_DXCLICK_EVENT_NAME);
        _events_engine.default.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, "td", function(e) {
            if (!(0, _renderer.default)(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
                _this._cellClickAction({
                    event: e,
                    value: (0, _renderer.default)(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
                })
            }
        })
    },
    _createCellClickAction: function() {
        this._cellClickAction = this._createActionByOption("onCellClick")
    },
    _createDisabledDatesHandler: function() {
        var disabledDates = this.option("disabledDates");
        this._disabledDatesHandler = Array.isArray(disabledDates) ? this._getDefaultDisabledDatesHandler(disabledDates) : disabledDates || _common.noop
    },
    _getDefaultDisabledDatesHandler: function(disabledDates) {
        return _common.noop
    },
    _isTodayCell: abstract,
    _isDateOutOfRange: abstract,
    isDateDisabled: function(cellDate) {
        var dateParts = {
            date: cellDate,
            view: this._getViewName()
        };
        return this._disabledDatesHandler(dateParts)
    },
    _isOtherView: abstract,
    _getCellText: abstract,
    _getFirstCellData: abstract,
    _getNextCellData: abstract,
    _renderContouredDate: function(contouredDate) {
        if (!this.option("focusStateEnabled")) {
            return
        }
        contouredDate = contouredDate || this.option("contouredDate");
        var $oldContouredCell = this._getContouredCell();
        var $newContouredCell = this._getCellByDate(contouredDate);
        $oldContouredCell.removeClass(CALENDAR_CONTOURED_DATE_CLASS);
        $newContouredCell.addClass(CALENDAR_CONTOURED_DATE_CLASS)
    },
    _getContouredCell: function() {
        return this._$table.find(".".concat(CALENDAR_CONTOURED_DATE_CLASS))
    },
    _changeValue: function(cellDate) {
        if (cellDate) {
            var value = this.option("value");
            var newValue = value ? new Date(value) : new Date;
            newValue.setDate(cellDate.getDate());
            newValue.setMonth(cellDate.getMonth());
            newValue.setFullYear(cellDate.getFullYear());
            newValue.setDate(cellDate.getDate());
            this.option("value", newValue)
        } else {
            this.option("value", null)
        }
    },
    _renderValue: function() {
        if (!this.option("allowValueSelection")) {
            return
        }
        var value = this.option("value");
        var selectedCell = this._getCellByDate(value);
        if (this._selectedCell) {
            this._selectedCell.removeClass(CALENDAR_SELECTED_DATE_CLASS)
        }
        selectedCell.addClass(CALENDAR_SELECTED_DATE_CLASS);
        this._selectedCell = selectedCell
    },
    getCellAriaLabel: function(date) {
        return this._getCellText(date)
    },
    _getFirstAvailableDate: function() {
        var date = this.option("date");
        var min = this.option("min");
        date = _date.default.getFirstDateView(this._getViewName(), date);
        return new Date(min && date < min ? min : date)
    },
    _getCellByDate: abstract,
    isBoundary: abstract,
    _optionChanged: function(args) {
        var name = args.name,
            value = args.value;
        switch (name) {
            case "value":
                this._renderValue();
                break;
            case "contouredDate":
                this._renderContouredDate(value);
                break;
            case "onCellClick":
                this._createCellClickAction();
                break;
            case "disabledDates":
            case "cellTemplate":
                this._invalidate();
                break;
            case "rtlEnabled":
                this._cacheAppendMethodName(value);
                this.callBase(args);
                break;
            case "_todayDate":
                this._renderBody();
                break;
            default:
                this.callBase(args)
        }
    }
});
var _default = BaseView;
exports.default = _default;
module.exports = exports.default;
